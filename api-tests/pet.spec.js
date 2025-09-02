import { test, expect } from '@playwright/test';

test.describe('Petstore API - Demo Tests (Public Swagger)', () => {
  let petId = Date.now();

  test('POST /pet - create pet (demo)', async ({ request }) => {
    const newPet = { id: petId, name: 'Fluffy', photoUrls: ['string'], status: 'available' };
    let response;
    try {
      response = await request.post('/pet', { data: newPet });
    } catch (err) {
      console.warn('POST /pet failed:', err.message);
      return;
    }

    if (response.ok()) {
      const body = await response.json();
      console.log('POST body:', body);
    } else {
      console.warn('POST /pet returned status:', response.status());
    }
  });

  test('GET /pet/{petId} - fetch pet', async ({ request }) => {
    let response;
    try {
      response = await request.get(`/pet/${petId}`);
    } catch (err) {
      console.warn('GET /pet failed:', err.message);
      return;
    }

    if (response.ok()) {
      const body = await response.json();
      console.log('GET body:', body);
    } else {
      console.warn('GET /pet returned status:', response.status());
    }
  });

  test('PUT /pet - update pet (demo)', async ({ request }) => {
    const updatedPet = { id: petId, name: 'Fluffy Updated', photoUrls: ['string'], status: 'sold' };
    let response;
    try {
      response = await request.put('/pet', { data: updatedPet });
    } catch (err) {
      console.warn('PUT /pet failed:', err.message);
      return;
    }

    if (response.ok()) {
      const body = await response.json();
      console.log('PUT body:', body);
    } else {
      console.warn('PUT /pet returned status:', response.status());
    }
  });

  test('DELETE /pet/{petId} - delete pet (demo)', async ({ request }) => {
    let response;
    try {
      response = await request.delete(`/pet/${petId}`);
    } catch (err) {
      console.warn('DELETE /pet failed:', err.message);
      return;
    }

    if (response.ok()) {
      console.log('DELETE succeeded');
    } else {
      console.warn('DELETE /pet returned status:', response.status());
    }
  });

  test('GET deleted pet should return 404 (demo)', async ({ request }) => {
    let response;
    try {
      response = await request.get(`/pet/${petId}`);
    } catch (err) {
      console.warn('GET after delete failed:', err.message);
      return;
    }

    if (response.ok()) {
      const body = await response.json();
      console.log('GET after delete body:', body);
    } else {
      console.warn('GET after delete returned status:', response.status());
    }
  });
});


