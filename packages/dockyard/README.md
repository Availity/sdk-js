# @availity/dockyard

> Convert yup schema to a friendly docs object

## Installation

### NPM

```bash
npm install @availity/dockyard
```

### Yarn

```bash
yarn add @availity/dockyard
```

## Usage

```javascript
import yup from 'yup';
import getRules from '@availity/dockyard`;

const schema = yup.object({
    name: yup.string(),
    dateOfBirth: yup.date()
});

const rules = getRules(schema, options);
```

### `options`

```javascript
options = {
    compileRequiredFields = false
    excludeOneOf = false
    excludeTypes = false
}
```

- `compileRequiredFields`: removes the word 'required' from the description and adds an array of required fields to the object.
- `excludeOneOf`: if oneOf is specified on an item, exclude it from the description.
- `excludeTypes`: exclude types from the description.
