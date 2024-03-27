describe('GraphQL API Tests', () => {

  context (`when retrieve Clients`, () => {

  it('should fetch clients successfully', () => {
    const query = `
    {
      clients {
        id
        name
        email
        phone
      }
    }
    `;
      cy.request({
        method: 'POST',
        url: 'http://localhost:3005/graphql',
        body: { query },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('clients');
        expect(res.body.data.clients).to.be.an('array');

        if (res.body.data.clients.length > 0) {
          const respClients = res.body.data.clients;
          expect(respClients[0]).to.have.property('id');
          expect(respClients[0]).to.have.property('name');
          expect(respClients[0]).to.have.property('email');
          expect(respClients[0]).to.have.property('phone');
        } else {
          expect(res.body.data.clients).to.be.empty
        }
      });
    });

  it ('should fetch a client successfully by ID', () => {
      const testClientID = "65a8ac457d3c0ca1f0aa9d54"
      const expectedTestName = 'Stan Me'
      const query = `
      {
        client (id: "${testClientID}") {
          id,
          name,
          email,
          phone
        }
      }
      `;
      const variables = {
        id: `${testClientID}` 
      };
  
      // Send a POST request to your GraphQL endpoint with the query and variables
      cy.request({
        method: 'POST',
        url: 'http://localhost:3005/graphql', 
        body: {
          query: query,
          variables: variables
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        // Assert that the HTTP status code is 200
        expect(res.status).to.eq(200);
        // Further assertions to verify the response structure and data
       
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('client');
        const client = res.body.data.client; 
        expect(client).to.have.property('id')
        expect (client.id).to.eq(testClientID)
        expect(client).to.have.property('name')
        expect (client.name).to.eq(expectedTestName)

       
      });
    }); 
  });

    
  context (`when retrieve Projects`, () => {
//#region variables projects
const query = `
        {
          projects {
            id
            name
            description
            status
            client {
                id
                name
            }
          }
        }
      `;
//#endregion variables 
    it('should fetches projects successfully', () => {
      
      
      cy.request({
        method: 'POST',
        url: 'http://localhost:3005/graphql', 
        body: { query },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('projects');
        expect(res.body.data.projects).to.be.an('array');

        if (res.body.data.projects.length > 0) {
          const respProjects = res.body.data.projects;
          expect(respProjects[0]).to.have.property('id');
          expect(respProjects[0]).to.have.property('name');
          expect(respProjects[0]).to.have.property('description');
          expect(respProjects[0]).to.have.property('status');
          expect(respProjects[0]).to.have.property('client');
          expect(respProjects[0].client).to.have.property('id');
          expect(respProjects[0].client).to.have.property('name');
        } else {
          expect(res.body.data.projects).to.be.empty
        }
      });
    });
  })
   
  });
  