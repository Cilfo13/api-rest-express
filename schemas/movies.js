const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'El titulo debe ser un string',
    required_error: 'El titulo es requerido'
  }),
  year: z.number().int().min(1900).max(2024).nullable(),
  director: z.string(),
  duration: z.number().int().positive().default(0),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: 'Poster tiene que ser una url valida'
  }).optional(),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Sci-Fi'])
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

// Todos los campos van a ser optional
function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
