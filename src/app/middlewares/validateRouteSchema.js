import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    start: Yup.object({
      x: Yup.string().required(),
      y: Yup.string().required()
    }),
    end: Yup.object({
      x: Yup.string().required(),
      y: Yup.string().required()
    })
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      message: 'start, end & name are required !',
    });
  }

  return next();
}
