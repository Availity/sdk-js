// Borrowed from  https://github.com/rubensworks/relative-to-absolute-iri.js but refactored to work with IE11.
function isCharacterAllowedAfterRelativePathSegment(character) {
  return !character || character === '#' || character === '?' || character === '/';
}

/**
 * Remove dot segments from the given path,
 * as described in https://www.ietf.org/rfc/rfc3986.txt (page 32).
 * @param {string} path An IRI path.
 * @return {string} A path, will always start with a '/'.
 */
export function removeDotSegments(path) {
  // Prepare a buffer with segments between each '/.
  // Each segment represents an array of characters.
  const segmentBuffers = [];

  let i = 0;
  while (i < path.length) {
    // Remove '/.' or '/..'
    switch (path[i]) {
      case '/': {
        if (path[i + 1] === '.') {
          if (path[i + 2] === '.') {
            // Append the remaining path as-is if we find an invalid character after the '.'
            if (!isCharacterAllowedAfterRelativePathSegment(path[i + 3])) {
              segmentBuffers.at(-1).push(path.substr(i));
              i = path.length;
              break;
            }

            // Go to parent directory,
            // so we remove a parent segment
            segmentBuffers.pop();

            // Ensure that we end with a slash if there is a trailing '/..'
            if (!path[i + 3]) {
              segmentBuffers.push([]);
            }

            i += 3;
          } else {
            // Append the remaining path as-is if we find an invalid character after the '.'
            if (!isCharacterAllowedAfterRelativePathSegment(path[i + 2])) {
              segmentBuffers.at(-1).push(path.substr(i));
              i = path.length;
              break;
            }

            // Ensure that we end with a slash if there is a trailing '/.'
            if (!path[i + 2]) {
              segmentBuffers.push([]);
            }

            // Go to the current directory,
            // so we do nothing
            i += 2;
          }
        } else {
          // Start a new segment
          segmentBuffers.push([]);
          i += 1;
        }
        break;
      }
      case '#':
      case '?': {
        // Query and fragment string should be appended unchanged
        if (segmentBuffers.length === 0) {
          segmentBuffers.push([]);
        }
        segmentBuffers.at(-1).push(path.substr(i));
        // Break the while loop
        i = path.length;
        break;
      }
      default: {
        // Not a special character, just append it to our buffer
        if (segmentBuffers.length === 0) {
          segmentBuffers.push([]);
        }
        segmentBuffers.at(-1).push(path[i]);
        i += 1;
        break;
      }
    }
  }

  return `/${segmentBuffers.map((buffer) => buffer.join('')).join('/')}`;
}

/**
 * Removes dot segments of the given IRI.
 * @param {string} iri An IRI (or part of IRI).
 * @param {number} colonPosition The position of the first ':' in the IRI.
 * @return {string} The IRI where dot segments were removed.
 */
export function removeDotSegmentsOfPath(iri, colonPosition) {
  // Determine where we should start looking for the first '/' that indicates the start of the path
  let searchOffset = colonPosition + 1;
  if (colonPosition >= 0) {
    if (iri[colonPosition + 1] === '/' && iri[colonPosition + 2] === '/') {
      searchOffset = colonPosition + 3;
    }
  } else if (iri[0] === '/' && iri[1] === '/') {
    searchOffset = 2;
  }

  // Determine the path
  const pathSeparator = iri.indexOf('/', searchOffset);
  if (pathSeparator < 0) {
    return iri;
  }
  const base = iri.substr(0, pathSeparator);
  const path = iri.substr(pathSeparator);

  // Remove dot segments from the path
  return base + removeDotSegments(path);
}

/**
 * Convert the given relative IRI to an absolute IRI
 * by taking into account the given optional baseIRI.
 *
 * @param {string} relativeIRI The relative IRI to convert to an absolute IRI.
 * @param {string} baseIRI The optional base IRI.
 * @return {string} an absolute IRI.
 */
export function resolve(relativeIRI, baseIRI = '') {
  const baseFragmentPos = baseIRI.indexOf('#');

  // Ignore any fragments in the base IRI
  if (baseFragmentPos > 0) {
    baseIRI = baseIRI.substr(0, baseFragmentPos);
  }

  // Convert empty value directly to base IRI
  if (relativeIRI.length === 0) {
    return baseIRI;
  }

  // If the value starts with a query character, concat directly (but strip the existing query)
  if (relativeIRI.indexOf('?') === 0) {
    const baseQueryPos = baseIRI.indexOf('?');
    if (baseQueryPos > 0) {
      baseIRI = baseIRI.substr(0, baseQueryPos);
    }
    return baseIRI + relativeIRI;
  }

  // If the value starts with a fragment character, concat directly
  if (relativeIRI.indexOf('#') === 0) {
    return baseIRI + relativeIRI;
  }

  // Ignore baseIRI if it is empty
  if (baseIRI.length === 0) {
    return removeDotSegmentsOfPath(relativeIRI, relativeIRI.indexOf(':'));
  }

  // Ignore baseIRI if the value is absolute
  const valueColonPos = relativeIRI.indexOf(':');
  if (valueColonPos >= 0) {
    return removeDotSegmentsOfPath(relativeIRI, valueColonPos);
  }

  // At this point, the baseIRI MUST be absolute, otherwise we error
  const baseColonPos = baseIRI.indexOf(':');
  if (baseColonPos < 0) {
    throw new Error(`Found invalid baseIRI '${baseIRI}' for value '${relativeIRI}'`);
  }

  const baseIRIScheme = baseIRI.substr(0, baseColonPos + 1);
  // Inherit the baseIRI scheme if the value starts with '//'
  if (relativeIRI.indexOf('//') === 0) {
    return baseIRIScheme + removeDotSegmentsOfPath(relativeIRI, valueColonPos);
  }

  // Check cases where '://' occurs in the baseIRI, and where there is no '/' after a ':' anymore.
  let baseSlashAfterColonPos;
  if (baseIRI.indexOf('//', baseColonPos) === baseColonPos + 1) {
    // If there is no additional '/' after the '//'.
    baseSlashAfterColonPos = baseIRI.indexOf('/', baseColonPos + 3);
    if (baseSlashAfterColonPos < 0) {
      // If something other than a '/' follows the '://', append the value after a '/',
      // otherwise, prefix the value with only the baseIRI scheme.
      if (baseIRI.length > baseColonPos + 3) {
        return `${baseIRI}/${removeDotSegmentsOfPath(relativeIRI, valueColonPos)}`;
      }

      return baseIRIScheme + removeDotSegmentsOfPath(relativeIRI, valueColonPos);
    }
  } else {
    // If there is not even a single '/' after the ':'
    baseSlashAfterColonPos = baseIRI.indexOf('/', baseColonPos + 1);
    // Always true: baseSlashAfterColonPos < 0
    // If something other than a '/' follows the ':', append the value after a '/',
    // otherwise, prefix the value with only the baseIRI scheme.
    if (baseIRI.length > baseColonPos + 1) {
      return `${baseIRI}/${removeDotSegmentsOfPath(relativeIRI, valueColonPos)}`;
    }

    return baseIRIScheme + removeDotSegmentsOfPath(relativeIRI, valueColonPos);
  }

  // If the value starts with a '/', then prefix it with everything before the first effective slash of the base IRI.
  if (relativeIRI.indexOf('/') === 0) {
    return baseIRI.substr(0, baseSlashAfterColonPos) + removeDotSegments(relativeIRI);
  }

  let baseIRIPath = baseIRI.substr(baseSlashAfterColonPos);
  const baseIRILastSlashPos = baseIRIPath.lastIndexOf('/');

  // Ignore everything after the last '/' in the baseIRI path
  if (baseIRILastSlashPos >= 0 && baseIRILastSlashPos < baseIRIPath.length - 1) {
    baseIRIPath = baseIRIPath.substr(0, baseIRILastSlashPos + 1);
    // Also remove the first character of the relative path if it starts with '.' (and not '..' or './')
    // This change is only allowed if there is something else following the path
    if (relativeIRI[0] === '.' && relativeIRI[1] !== '.' && relativeIRI[1] !== '/' && relativeIRI[2]) {
      relativeIRI = relativeIRI.substr(1);
    }
  }

  // Prefix the value with the baseIRI path where
  relativeIRI = baseIRIPath + relativeIRI;

  // Remove dot segment from the IRI
  relativeIRI = removeDotSegments(relativeIRI);

  // Prefix our transformed value with the part of the baseIRI until the first '/' after the first ':'.
  return baseIRI.substr(0, baseSlashAfterColonPos) + relativeIRI;
}
