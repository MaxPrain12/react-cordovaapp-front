describe('Shotshare', () => {

  it('Iniciamos sesion', () => {
    cy.viewport('samsung-s10')
    cy.visit('/')
    cy.get('input[type=email]').type('alder.manino@gmail.com')
    cy.get('input[type=password]').type('alderDario12')
    cy.wait(2000)
    cy.get('.btn').click()


    cy.wait(2000)
    cy.contains('PUBLICAR').click()
    cy.wait(2000)
    const filepath = 'PruebaPublicacion.jpg'
    cy.get('input[type=file]').attachFile(filepath)
    cy.get('input[type=text]').type('Esto es una prueba de publicacion')
    cy.get('.btn').click()
    cy.wait(6000)
    cy.get('body').click(0,0)


    cy.wait(2000)
    cy.contains('HOME').click()

    cy.wait(2000)
    cy.contains('MaxPrain').first().click({force: true})
    cy.visit('/Perfil')

    cy.wait(2000)
    cy.contains('Seguidores').click()

    cy.wait(2000)
    cy.get('.doggelUser1').first().click({force: true})
    
    cy.wait(2000)
    cy.contains('BUSCAR').click()

    cy.wait(2000)
    cy.get('input[class="form-control inputBuscar"]').type('Angel')

    cy.wait(2000)
    cy.get('.doggelUser').first().click({force: true})


    cy.wait(2000)
    cy.contains('PERFIL').click()

    cy.wait(2000)
    cy.get('[class="md icon-large hydrated"]').click()

    cy.wait(1000)
    cy.contains('Editar Perfil').click()


    cy.get('input[id="formBasicEmail"]').type('Awanakikon')

    cy.get('.btn').click()
  
  })


})

