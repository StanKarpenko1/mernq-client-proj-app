describe('GraphQL API Tests', () => {
    it('Fetches clients successfully', () => {
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
        url: 'http://localhost:3005/graphql', // Adjust if your GraphQL endpoint differs
        body: { query },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('clients');
        expect(res.body.data.clients).to.be.an('array');
      });
    });
  });
  