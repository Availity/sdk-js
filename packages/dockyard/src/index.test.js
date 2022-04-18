import * as yup from 'yup';

import getRules from '.';

const movieSchema = yup.object({
  name: yup.string().matches('/^[w-]*$/').required(),
  job: yup.string().max(250).notOneOf(['critic', 'blogger', 'influencer']),
  friends: yup
    .object({
      name: yup.string().matches('/^[w-]*$/').required(),
      job: yup.string().max(250).oneOf(['critic', 'blogger', 'influencer']),
      favoriteMovie: yup
        .object({
          name: yup.string().min(1).required(),
          rating: yup.number().min(1).max(5),
          awards: yup.object({
            bestMovie: yup.boolean().required(),
            bestActor: yup.boolean().required(),
          }),
          actors: yup
            .array(
              yup.object({
                name: yup.string().max(100).required(),
                birthDate: yup.date(),
              })
            )
            .max(10),
        })
        .required(),
    })
    .noUnknown()
    .required(),
});

describe('dockyard', () => {
  test('getRules w/ no options', () => {
    const docs = getRules(movieSchema);

    expect(docs.name).toStrictEqual('Rules: string, matches regex /^[w-]*$/, required.');
    expect(docs.job).toStrictEqual('Rules: string, not one of: [critic, blogger, influencer], max 250 chars.');
    expect(docs.friends._friends).toStrictEqual('Rules: object, noUnknown, required.');
    expect(docs.friends.name).toStrictEqual('Rules: string, matches regex /^[w-]*$/, required.');
    expect(docs.friends.job).toStrictEqual('Rules: string, one of: [critic, blogger, influencer], max 250 chars.');
    expect(docs.friends.favoriteMovie._favoriteMovie).toStrictEqual('Rules: object, required.');
    expect(docs.friends.favoriteMovie.name).toStrictEqual('Rules: string, min 1 chars, required.');
    expect(docs.friends.favoriteMovie.rating).toStrictEqual('Rules: number, min 1, max 5.');
    expect(docs.friends.favoriteMovie.awards.bestMovie).toStrictEqual('Rules: boolean, required.');
    expect(docs.friends.favoriteMovie.awards.bestActor).toStrictEqual('Rules: boolean, required.');
    expect(docs.friends.favoriteMovie.actors._actors).toStrictEqual('Rules: array, max 10.');
    expect(docs.friends.favoriteMovie.actors.name).toStrictEqual('Rules: string, max 100 chars, required.');
  });

  test('getRules w/ compileRequiredFields', () => {
    const docs = getRules(movieSchema, { compileRequiredFields: true });

    expect(docs.name).toStrictEqual('Rules: string, matches regex /^[w-]*$/.');
    expect(docs.job).toStrictEqual('Rules: string, not one of: [critic, blogger, influencer], max 250 chars.');
    expect(docs.friends._friends).toStrictEqual('Rules: object, noUnknown.');
    expect(docs.friends.name).toStrictEqual('Rules: string, matches regex /^[w-]*$/.');
    expect(docs.friends.job).toStrictEqual('Rules: string, one of: [critic, blogger, influencer], max 250 chars.');
    expect(docs.friends.favoriteMovie._favoriteMovie).toStrictEqual('Rules: object.');
    expect(docs.friends.favoriteMovie.name).toStrictEqual('Rules: string, min 1 chars.');
    expect(docs.friends.favoriteMovie.rating).toStrictEqual('Rules: number, min 1, max 5.');
    expect(docs.friends.favoriteMovie.awards.bestMovie).toStrictEqual('Rules: boolean.');
    expect(docs.friends.favoriteMovie.awards.bestActor).toStrictEqual('Rules: boolean.');
    expect(docs.friends.favoriteMovie.actors._actors).toStrictEqual('Rules: array, max 10.');
    expect(docs.friends.favoriteMovie.actors.name).toStrictEqual('Rules: string, max 100 chars.');
    expect(docs.requiredFields).toStrictEqual([
      'name',
      'friends',
      'friends.name',
      'friends.favoriteMovie',
      'friends.favoriteMovie.name',
      'friends.favoriteMovie.awards.bestMovie',
      'friends.favoriteMovie.awards.bestActor',
      'friends.favoriteMovie.actors.name',
    ]);
  });

  test('getRules w/ excludeOneOf', () => {
    const docs = getRules(movieSchema, { excludeOneOf: true });

    expect(docs.name).toStrictEqual('Rules: string, matches regex /^[w-]*$/, required.');
    expect(docs.job).toStrictEqual('Rules: string, not one of: [critic, blogger, influencer], max 250 chars.');
    expect(docs.friends._friends).toStrictEqual('Rules: object, noUnknown, required.');
    expect(docs.friends.name).toStrictEqual('Rules: string, matches regex /^[w-]*$/, required.');
    expect(docs.friends.job).toStrictEqual('Rules: string, max 250 chars.');
    expect(docs.friends.favoriteMovie._favoriteMovie).toStrictEqual('Rules: object, required.');
    expect(docs.friends.favoriteMovie.name).toStrictEqual('Rules: string, min 1 chars, required.');
    expect(docs.friends.favoriteMovie.rating).toStrictEqual('Rules: number, min 1, max 5.');
    expect(docs.friends.favoriteMovie.awards.bestMovie).toStrictEqual('Rules: boolean, required.');
    expect(docs.friends.favoriteMovie.awards.bestActor).toStrictEqual('Rules: boolean, required.');
    expect(docs.friends.favoriteMovie.actors._actors).toStrictEqual('Rules: array, max 10.');
    expect(docs.friends.favoriteMovie.actors.name).toStrictEqual('Rules: string, max 100 chars, required.');
  });

  test('getRules w/ excludeTypes', () => {
    const docs = getRules(movieSchema, { excludeTypes: true });

    expect(docs.name).toStrictEqual('Rules: matches regex /^[w-]*$/, required.');
    expect(docs.job).toStrictEqual('Rules: not one of: [critic, blogger, influencer], max 250 chars.');
    expect(docs.friends._friends).toStrictEqual('Rules: noUnknown, required.');
    expect(docs.friends.name).toStrictEqual('Rules: matches regex /^[w-]*$/, required.');
    expect(docs.friends.job).toStrictEqual('Rules: one of: [critic, blogger, influencer], max 250 chars.');
    expect(docs.friends.favoriteMovie._favoriteMovie).toStrictEqual('Rules: required.');
    expect(docs.friends.favoriteMovie.name).toStrictEqual('Rules: min 1 chars, required.');
    expect(docs.friends.favoriteMovie.rating).toStrictEqual('Rules: min 1, max 5.');
    expect(docs.friends.favoriteMovie.awards.bestMovie).toStrictEqual('Rules: required.');
    expect(docs.friends.favoriteMovie.awards.bestActor).toStrictEqual('Rules: required.');
    expect(docs.friends.favoriteMovie.actors._actors).toStrictEqual('Rules: max 10.');
    expect(docs.friends.favoriteMovie.actors.name).toStrictEqual('Rules: max 100 chars, required.');
  });
});
