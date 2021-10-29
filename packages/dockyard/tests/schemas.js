const yup = require('yup');

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

module.exports = { movieSchema };
