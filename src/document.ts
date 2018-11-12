import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
export async function genDoc(app) {
  const apiGennerateDoc = new DocumentBuilder()
    .setTitle('Backend Educationinsurance Api')
    .setDescription(
      'This is document tell about how to call restfullapi and datamodel + can test to call api',
    )
    .setVersion('0.0.1')
    .addTag('Educationinsurance')
    .setBasePath('/api')
    .addBearerAuth('Authorization', 'header')
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, apiGennerateDoc)
  app.use('/api/docs/swagger.json', (req, res) => {
    res.send(swaggerDocument)
  })
  SwaggerModule.setup('api/doc', app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  })
}
