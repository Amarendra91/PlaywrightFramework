import { expect, test } from '../../fixtures/hooks-fixture';
import apiPathData from '../../test-data/api-data/api-path-data.json';
import restfulApiData from '../../test-data/api-data/restful-booker-api-module.json';

let bookingIdsResp: any;
let bookingIdsJsonResp: any;
let bookingDetailsResp: any;
let bookingDetailsJsonResp: any;
let createBookingResp: any;
let createBookingJsonResp: any;
let updatedBookingResp: any;
let updatedBookingJsonResp: any;
let partialUpdatedBookingResp: any;
let partialUpdatedBookingJsonResp: any;
let deletedBookingResp: any;
let currentBookingDetailsResp: any;
let bookingId: any;
let tokenValue: any;

test.describe('Validate all booking realated APIs', async () => {
  test(
    '[Booking] Verify all booking Id(s) retrieved successfully using GET API endpoint.',
    { tag: '@Smoke' },
    async ({ request }) => {
      await test.step('Execute GET API endpoint and store the response into a variable ', async () => {
        bookingIdsResp = await request.get(apiPathData.booking_path);
      });

      await test.step('Verify response status code.', async () => {
        expect(bookingIdsResp.status()).toBe(200);
      });

      await test.step('Verify response status text.', async () => {
        expect(bookingIdsResp.statusText()).toBe('OK');
      });

      await test.step('Verify content type value in response header.', async () => {
        expect(bookingIdsResp.headers()['content-type']).toBe(
          restfulApiData.content_type
        );
      });

      await test.step('Parse the received json response body into js object.', async () => {
        bookingIdsJsonResp = await bookingIdsResp.json();
      });

      await test.step('Verify response body is not empty.', async () => {
        expect(bookingIdsJsonResp).not.toBeNull();
      });
    }
  );

  test(
    '[Booking] Verify new booking id created successfully using POST API endpoint.',
    { tag: '@Regression' },
    async ({ request }) => {
      await test.step('Execute POST API endpoint and store the response into a variable.', async () => {
        createBookingResp = await request.post(apiPathData.booking_path, {
          data: restfulApiData.create_booking_request_payload_data,
        });
      });

      await test.step('Verify response status code.', async () => {
        expect(createBookingResp.status()).toBe(200);
      });

      await test.step('Verify response status text.', async () => {
        expect(createBookingResp.statusText()).toBe('OK');
      });

      await test.step('Parse the received json response body into js object.', async () => {
        createBookingJsonResp = await createBookingResp.json();
      });

      await test.step('Verify response body is not empty.', async () => {
        expect(createBookingJsonResp).not.toBeNull();
      });

      await test.step('Verify booking key received in response body.', async () => {
        expect(createBookingJsonResp).toHaveProperty(
          restfulApiData.create_booking_response_booking_key
        );
      });

      await test.step('Verify booking key in response body is not empty.', async () => {
        expect(
          createBookingJsonResp[
            restfulApiData.create_booking_response_booking_key
          ]
        ).not.toBeNull();
      });

      await test.step('Verify booking key value received in response body matched with booking key value sent in request body.', async () => {
        expect(
          createBookingJsonResp[
            restfulApiData.create_booking_response_booking_key
          ]
        ).toMatchObject(restfulApiData.create_booking_request_payload_data);

        bookingId = createBookingJsonResp.bookingid;
      });
    }
  );

  test(
    '[Booking] Verify existing booking id updated completely using PUT API endpoint with Basic Authorization token header.',
    { tag: '@Regression' },
    async ({ request }) => {
      await test.step('Execute PUT API endpoint and store the response into a variable.', async () => {
        updatedBookingResp = await request.put(
          `${apiPathData.booking_path}/${bookingId}`,
          {
            headers: { Authorization: `Basic ${process.env.BASIC_AUTH_TOKEN}` },
            data: restfulApiData.full_booking_update_payload1,
          }
        );
      });

      await test.step('Verify response status code.', async () => {
        expect(updatedBookingResp.status()).toBe(200);
      });

      await test.step('Verify response status text.', async () => {
        expect(updatedBookingResp.statusText()).toBe('OK');
      });

      await test.step('Parse the received json response body into js object.', async () => {
        updatedBookingJsonResp = await updatedBookingResp.json();
      });

      await test.step('Verify response body is not empty.', async () => {
        expect(updatedBookingJsonResp).not.toBeNull();
      });

      await test.step('Verify response body matched with request body.', async () => {
        expect(updatedBookingJsonResp).toMatchObject(
          restfulApiData.full_booking_update_payload1
        );
      });
    }
  );

  test(
    '[Booking] Verify existing booking id updated completely using PUT API endpoint with Cookie token header.',
    { tag: '@Regression' },
    async ({ request, commonApiUtils }) => {
      await test.step('Execute PUT API endpoint and store the response into a variable.', async ({}) => {
        tokenValue = await commonApiUtils.generateAuthToken();
        updatedBookingResp = await request.put(
          `${apiPathData.booking_path}/${bookingId}`,
          {
            headers: { Cookie: `token=${tokenValue}` },
            data: restfulApiData.full_booking_update_payload2,
          }
        );
      });

      await test.step('Verify response status code.', async () => {
        expect(updatedBookingResp.status()).toBe(200);
      });

      await test.step('Verify response status text.', async () => {
        expect(updatedBookingResp.statusText()).toBe('OK');
      });

      await test.step('Parse the received json response body into js object.', async () => {
        updatedBookingJsonResp = await updatedBookingResp.json();
      });

      await test.step('Verify response body is not empty.', async () => {
        expect(updatedBookingJsonResp).not.toBeNull();
      });

      await test.step('Verify response body matched with request body.', async () => {
        expect(updatedBookingJsonResp).toMatchObject(
          restfulApiData.full_booking_update_payload2
        );
      });
    }
  );

  test(
    '[Booking] Verify existing booking id updated partially using PATCH API endpoint with Cookie token header.',
    { tag: '@Regression' },
    async ({ request, commonApiUtils }) => {
      await test.step('Execute PATCH API endpoint and store the response into a variable.', async ({}) => {
        tokenValue = await commonApiUtils.generateAuthToken();
        partialUpdatedBookingResp = await request.patch(
          `${apiPathData.booking_path}/${bookingId}`,
          {
            headers: { Cookie: `token=${tokenValue}` },
            data: restfulApiData.partial_booking_update_payload,
          }
        );
      });

      await test.step('Verify response status code.', async () => {
        expect(partialUpdatedBookingResp.status()).toBe(200);
      });

      await test.step('Verify response status text.', async () => {
        expect(partialUpdatedBookingResp.statusText()).toBe('OK');
      });

      await test.step('Parse the received json response body into js object.', async () => {
        partialUpdatedBookingJsonResp = await partialUpdatedBookingResp.json();
      });

      await test.step('Verify response body is not empty.', async () => {
        expect(partialUpdatedBookingJsonResp).not.toBeNull();
      });

      await test.step('Verify both firstname and lastname received in response body matched with request body details.', async () => {
        expect(
          partialUpdatedBookingJsonResp[
            restfulApiData.booking_details_response_fn_key
          ]
        ).toMatch(restfulApiData.partial_booking_update_payload.firstname);
        expect(
          partialUpdatedBookingJsonResp[
            restfulApiData.booking_details_response_ln_key
          ]
        ).toMatch(restfulApiData.partial_booking_update_payload.lastname);
      });
    }
  );

  test(
    '[Booking] Verify booking details retrieved successfully for specific booking Id using GET API endpoint.',
    { tag: '@Regression' },
    async ({ request }) => {
      await test.step('Execute GET API endpoint and store the response into a variable.', async () => {
        bookingDetailsResp = await request.get(
          `${apiPathData.booking_path}/${bookingId}`
        );
      });

      await test.step('Verify response status code.', async () => {
        expect(bookingDetailsResp.status()).toBe(200);
      });

      await test.step('Verify response status text.', async () => {
        expect(bookingDetailsResp.ok()).toBeTruthy();
      });

      await test.step('Parse the received json response body into js object.', async () => {
        bookingDetailsJsonResp = await bookingDetailsResp.json();
      });

      await test.step('Verify response body is not empty.', async () => {
        expect(bookingDetailsJsonResp).not.toBeNull();
      });

      await test.step('Verify firstname key received in response body.', async () => {
        expect(bookingDetailsJsonResp).toHaveProperty(
          restfulApiData.booking_details_response_fn_key
        );
      });

      await test.step('Verify firstname key value in response body is not empty.', async () => {
        expect(
          bookingDetailsJsonResp[restfulApiData.booking_details_response_fn_key]
        ).not.toBeNull();
      });

      await test.step('Verify lastname key received in response body.', async () => {
        expect(bookingDetailsJsonResp).toHaveProperty(
          restfulApiData.booking_details_response_ln_key
        );
      });

      await test.step('Verify lastname key value in response body is not empty.', async () => {
        expect(
          bookingDetailsJsonResp[restfulApiData.booking_details_response_ln_key]
        ).not.toBeNull();
      });
    }
  );

  test(
    '[Booking] Verify booking details deleted successfully for specific booking Id using DELETE API endpoint.',
    { tag: '@Regression' },
    async ({ request, commonApiUtils }) => {
      tokenValue = await commonApiUtils.generateAuthToken();
      await test.step('Execute DELETE API endpoint and store the response into a variable.', async () => {
        deletedBookingResp = await request.delete(
          `${apiPathData.booking_path}/${bookingId}`,
          {
            headers: { Cookie: `token=${tokenValue}` },
          }
        );
      });

      await test.step('Verify response status code.', async () => {
        expect(deletedBookingResp.status()).toBe(201);
      });

      await test.step('Verify response status text.', async () => {
        expect(deletedBookingResp.statusText()).toBe('Created');
      });

      await test.step('Verify deleted booking Id no longer retrieved using GET API endpoint.', async () => {
        currentBookingDetailsResp = await request.get(
          `${apiPathData.booking_path}/${bookingId}`
        );
        expect(currentBookingDetailsResp.status()).toBe(404);
        expect(currentBookingDetailsResp.statusText()).toBe('Not Found');
      });
    }
  );
});
