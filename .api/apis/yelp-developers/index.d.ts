import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * The Fusion AI endpoint brings conversational intelligence to your applications, enabling
     * users to ask natural language questions and receive real-time, contextually relevant
     * answers powered by Yelp’s latest business data and reviews.
     *
     * **Fusion AI Features**
     * - 🔍 **Next generation search & discovery** – Search with natural language, discover,
     * and connect with contextually relevant businesses.
     * - 💬 **Multi-turn conversations** – Support back-and-forth interactions and refine
     * queries with follow-up questions.
     * - 📌 **Direct business queries** – Ask targeted questions about businesses without
     * needing to perform a prior search.
     *
     * 🚀 **Try it now** – Test Fusion AI for free in our **<a
     * href="https://www.yelp.com/developers/fusion-ai/chat" target="_blank">playground</a>**
     * and see real-time responses in action.
     *
     * @summary Fusion AI (Search & Chat)
     * @throws FetchError<400, types.V2AiChatResponse400> Bad Request. Message varies depending on failure scenario
     * @throws FetchError<401, types.V2AiChatResponse401> The API key has either expired or doesn't have the required scopes to query this
     * endpoint.
     *
     * | code  | description |
     * | ------------- | ------------- |
     * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
     * endpoint.  |
     * | TOKEN_INVALID  | Invalid API key or authorization header.  |
     *
     * @throws FetchError<403, types.V2AiChatResponse403> The API key provided is not currently able to query this endpoint.
     * @throws FetchError<404, types.V2AiChatResponse404> Resource Not Found
     * @throws FetchError<413, types.V2AiChatResponse413> The length of the request exceeded the maximum allowed
     * @throws FetchError<429, types.V2AiChatResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
     * limit for this endpoint. Try reducing the rate at which you make queries.
     * @throws FetchError<500, types.V2AiChatResponse500> Internal Server Error
     * @throws FetchError<503, types.V2AiChatResponse503> Service Unavailable
     */
    v2_ai_chat(body: types.V2AiChatBodyParam): Promise<FetchResponse<200, types.V2AiChatResponse200>>;
    /**
     * This endpoint returns up to 240 businesses with some basic information based on the
     * provided search criteria.
     *
     * Try our new AI API to create conversational search <a
     * href="https://docs.developer.yelp.com/reference/v3_post_natural_language_search"
     * target="_blank">here</a>, you can also test it directly in our <a
     * href="https://www.yelp.com/developers/yelp-ai/chat" target="_blank">UI Playground</a>.
     *
     * **Note:** The API does not return businesses without any reviews.
     *
     * @summary Search
     * @throws FetchError<400, types.V3BusinessSearchResponse400> Bad Request. Message varies depending on failure scenario
     * @throws FetchError<401, types.V3BusinessSearchResponse401> The API key has either expired or doesn't have the required scopes to query this
     * endpoint.
     *
     * | code  | description |
     * | ------------- | ------------- |
     * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
     * endpoint.  |
     * | TOKEN_INVALID  | Invalid API key or authorization header.  |
     *
     * @throws FetchError<403, types.V3BusinessSearchResponse403> The API key provided is not currently able to query this endpoint.
     * @throws FetchError<404, types.V3BusinessSearchResponse404> Resource Not Found
     * @throws FetchError<413, types.V3BusinessSearchResponse413> The length of the request exceeded the maximum allowed
     * @throws FetchError<429, types.V3BusinessSearchResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
     * limit for this endpoint. Try reducing the rate at which you make queries.
     * @throws FetchError<500, types.V3BusinessSearchResponse500> Internal Server Error
     * @throws FetchError<503, types.V3BusinessSearchResponse503> Service Unavailable
     */
    v3_business_search(metadata?: types.V3BusinessSearchMetadataParam): Promise<FetchResponse<200, types.V3BusinessSearchResponse200>>;
    /**
     * This endpoint returns a list of businesses based on the provided phone number. It is
     * possible for more than one business to have the same phone number (for example, chain
     * stores with the same +1 800 phone number).
     *
     * Note: at this time, the API does not return businesses without any reviews.
     *
     * @summary Phone Search
     * @throws FetchError<400, types.V3BusinessPhoneSearchResponse400> Bad Request. Message varies depending on failure scenario
     * @throws FetchError<401, types.V3BusinessPhoneSearchResponse401> The API key has either expired or doesn't have the required scopes to query this
     * endpoint.
     *
     * | code  | description |
     * | ------------- | ------------- |
     * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
     * endpoint.  |
     * | TOKEN_INVALID  | Invalid API key or authorization header.  |
     *
     * @throws FetchError<403, types.V3BusinessPhoneSearchResponse403> The API key provided is not currently able to query this endpoint.
     * @throws FetchError<404, types.V3BusinessPhoneSearchResponse404> Resource Not Found
     * @throws FetchError<413, types.V3BusinessPhoneSearchResponse413> The length of the request exceeded the maximum allowed
     * @throws FetchError<429, types.V3BusinessPhoneSearchResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
     * limit for this endpoint. Try reducing the rate at which you make queries.
     * @throws FetchError<500, types.V3BusinessPhoneSearchResponse500> Internal Server Error
     * @throws FetchError<503, types.V3BusinessPhoneSearchResponse503> Service Unavailable
     */
    v3_business_phone_search(metadata: types.V3BusinessPhoneSearchMetadataParam): Promise<FetchResponse<200, types.V3BusinessPhoneSearchResponse200>>;
    /**
     * This endpoint lets you match business data from other sources against businesses on
     * Yelp, based on provided business information.
     * For example, if you know a business's exact address and name, and you want to find that
     * business only on Yelp.
     *
     * <span style="color:red;font-weight:bold">When should you use the Business Match
     * endpoint?</span>
     * We have several endpoints that will return information on Yelp businesses. You should
     * pick the endpoint to use based on how specific your input information is.
     *
     * * [Business Match endpoint](https://docs.developer.yelp.com/reference/v3_business_match)
     * when you have precise info like name & address
     * * [Business Search
     * endpoint](https://docs.developer.yelp.com/reference/v3_business_search) when you have
     * general info on the biz like name & location but don't know the address
     * * [Phone Search
     * endpoint](https://docs.developer.yelp.com/reference/v3_business_phone_search) when you
     * only have the phone number or less confident about other matching criteria
     *
     * All of these endpoints return the same information about each business.
     *
     * **Note:** at this time, the API does not return businesses without any reviews.
     *
     * @summary Business Match
     * @throws FetchError<400, types.V3BusinessMatchResponse400> Bad Request. Message varies depending on failure scenario
     * @throws FetchError<401, types.V3BusinessMatchResponse401> The API key has either expired or doesn't have the required scopes to query this
     * endpoint.
     *
     * | code  | description |
     * | ------------- | ------------- |
     * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
     * endpoint.  |
     * | TOKEN_INVALID  | Invalid API key or authorization header.  |
     *
     * @throws FetchError<403, types.V3BusinessMatchResponse403> The API key provided is not currently able to query this endpoint.
     * @throws FetchError<404, types.V3BusinessMatchResponse404> Resource Not Found
     * @throws FetchError<413, types.V3BusinessMatchResponse413> The length of the request exceeded the maximum allowed
     * @throws FetchError<429, types.V3BusinessMatchResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
     * limit for this endpoint. Try reducing the rate at which you make queries.
     * @throws FetchError<500, types.V3BusinessMatchResponse500> Internal Server Error
     * @throws FetchError<503, types.V3BusinessMatchResponse503> Service Unavailable
     */
    v3_business_match(metadata: types.V3BusinessMatchMetadataParam): Promise<FetchResponse<200, types.V3BusinessMatchResponse200>>;
    /**
     * This endpoint returns detailed business content.
     * Normally, you would get the Business ID from
     * [/v3/businesses/search](https://docs.developer.yelp.com/reference/v3_business_search),
     * [/v3/businesses/search/phone](https://docs.developer.yelp.com/reference/v3_business_phone_search),
     * [/v3/transactions/{transaction_type}/search](https://docs.developer.yelp.com/reference/v3_transaction_search)
     * or [/v3/autocomplete](https://docs.developer.yelp.com/reference/v3_autocomplete).
     * To retrieve review excerpts for a business, please refer to our Reviews endpoint
     * ([/v3/businesses/{id}/reviews](https://docs.developer.yelp.com/reference/v3_business_reviews))
     *
     * **Note:** at this time, the API does not return businesses without any reviews.
     *
     * @summary Business Details
     * @throws FetchError<400, types.V3BusinessInfoResponse400> Bad Request. Message varies depending on failure scenario
     * @throws FetchError<401, types.V3BusinessInfoResponse401> The API key has either expired or doesn't have the required scopes to query this
     * endpoint.
     *
     * | code  | description |
     * | ------------- | ------------- |
     * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
     * endpoint.  |
     * | TOKEN_INVALID  | Invalid API key or authorization header.  |
     *
     * @throws FetchError<403, types.V3BusinessInfoResponse403> The API key provided is not currently able to query this endpoint.
     * @throws FetchError<404, types.V3BusinessInfoResponse404> Resource Not Found
     * @throws FetchError<413, types.V3BusinessInfoResponse413> The length of the request exceeded the maximum allowed
     * @throws FetchError<429, types.V3BusinessInfoResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
     * limit for this endpoint. Try reducing the rate at which you make queries.
     * @throws FetchError<500, types.V3BusinessInfoResponse500> Internal Server Error
     * @throws FetchError<503, types.V3BusinessInfoResponse503> Service Unavailable
     */
    v3_business_info(metadata: types.V3BusinessInfoMetadataParam): Promise<FetchResponse<200, types.V3BusinessInfoResponse200>>;
    /**
     * This endpoint returns a list of businesses which support requested transaction type.
     *
     * **Note:**
     * * At this time, the API does not return businesses without any reviews.
     * * Currently, this endpoint only supports food delivery in the US.
     *
     * @summary Food Delivery Search
     * @throws FetchError<400, types.V3TransactionSearchResponse400> Bad Request. Message varies depending on failure scenario
     * @throws FetchError<401, types.V3TransactionSearchResponse401> The API key has either expired or doesn't have the required scopes to query this
     * endpoint.
     *
     * | code  | description |
     * | ------------- | ------------- |
     * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
     * endpoint.  |
     * | TOKEN_INVALID  | Invalid API key or authorization header.  |
     *
     * @throws FetchError<403, types.V3TransactionSearchResponse403> The API key provided is not currently able to query this endpoint.
     * @throws FetchError<404, types.V3TransactionSearchResponse404> Resource Not Found
     * @throws FetchError<413, types.V3TransactionSearchResponse413> The length of the request exceeded the maximum allowed
     * @throws FetchError<429, types.V3TransactionSearchResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
     * limit for this endpoint. Try reducing the rate at which you make queries.
     * @throws FetchError<500, types.V3TransactionSearchResponse500> Internal Server Error
     * @throws FetchError<503, types.V3TransactionSearchResponse503> Service Unavailable
     */
    v3_transaction_search(metadata: types.V3TransactionSearchMetadataParam): Promise<FetchResponse<200, types.V3TransactionSearchResponse200>>;
    /**
     * Returns engagement metrics information for the provided businesses.
     * <blockquote class="callout callout_warn">
     *   This endpoint requires special permissions to be enabled for your Yelp Fusion API Key.
     * </blockquote>
     *
     * @summary Engagement Metrics
     * @throws FetchError<400, types.V3GetBusinessesEngagementResponse400> Bad Request. Message varies depending on failure scenario
     * @throws FetchError<401, types.V3GetBusinessesEngagementResponse401> The API key has either expired or doesn't have the required scopes to query this
     * endpoint.
     *
     * | code  | description |
     * | ------------- | ------------- |
     * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
     * endpoint.  |
     * | TOKEN_INVALID  | Invalid API key or authorization header.  |
     *
     * @throws FetchError<403, types.V3GetBusinessesEngagementResponse403> The API key provided is not currently able to query this endpoint.
     * @throws FetchError<404, types.V3GetBusinessesEngagementResponse404> Resource Not Found
     * @throws FetchError<413, types.V3GetBusinessesEngagementResponse413> The length of the request exceeded the maximum allowed
     * @throws FetchError<429, types.V3GetBusinessesEngagementResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
     * limit for this endpoint. Try reducing the rate at which you make queries.
     * @throws FetchError<500, types.V3GetBusinessesEngagementResponse500> Internal Server Error
     * @throws FetchError<503, types.V3GetBusinessesEngagementResponse503> Service Unavailable
     */
    v3_get_businesses_engagement(metadata: types.V3GetBusinessesEngagementMetadataParam): Promise<FetchResponse<200, types.V3GetBusinessesEngagementResponse200>>;
    /**
     * Returns active and eligible service offerings for a business.
     * <blockquote class="callout callout_warn">
     *   This endpoint requires special permissions to be enabled for your Yelp Fusion API Key.
     * </blockquote>
     *
     * @summary Service Offerings
     * @throws FetchError<400, types.V3BusinessServiceOfferingsResponse400> Bad Request. Message varies depending on failure scenario
     * @throws FetchError<401, types.V3BusinessServiceOfferingsResponse401> The API key has either expired or doesn't have the required scopes to query this
     * endpoint.
     *
     * | code  | description |
     * | ------------- | ------------- |
     * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
     * endpoint.  |
     * | TOKEN_INVALID  | Invalid API key or authorization header.  |
     *
     * @throws FetchError<403, types.V3BusinessServiceOfferingsResponse403> The API key provided is not currently able to query this endpoint.
     * @throws FetchError<404, types.V3BusinessServiceOfferingsResponse404> Resource Not Found
     * @throws FetchError<413, types.V3BusinessServiceOfferingsResponse413> The length of the request exceeded the maximum allowed
     * @throws FetchError<429, types.V3BusinessServiceOfferingsResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
     * limit for this endpoint. Try reducing the rate at which you make queries.
     * @throws FetchError<500, types.V3BusinessServiceOfferingsResponse500> Internal Server Error
     * @throws FetchError<503, types.V3BusinessServiceOfferingsResponse503> Service Unavailable
     */
    v3_business_service_offerings(metadata: types.V3BusinessServiceOfferingsMetadataParam): Promise<FetchResponse<200, types.V3BusinessServiceOfferingsResponse200>>;
    /**
     * This endpoint lets you enable or disable Request a Phone Call for a particular business.
     * Check whether the business is eligible using the [Get business by
     * ID](https://docs.developer.yelp.com/reference/v3_business_info) endpoint and inspecting
     * the *rapc* object.
     *
     * *Example*:
     * To enable Request a Phone call for a Business with ID "loPSlzp6M628rzyCRPqrv3tC", send
     * an [authenticated](https://docs.developer.yelp.com/docs/authorization-code-workflow)
     * POST request to the URL:
     * https://api.yelp.com/v3/businesses/loPSlzp6M628rzyCRPqrv3tC/rapc_enabledness with the
     * following request body:
     *
     * ```json
     * {
     *     "is_enabled": true,
     * }
     * ```
     *
     * For the above request, a successful POST call will return a 202 accepted response.
     *
     * @summary Enable/Disable Request a Phone Call
     * @throws FetchError<400, types.V3BusinessRapcEnablednessResponse400> Bad Request. Message varies depending on failure scenario
     * @throws FetchError<401, types.V3BusinessRapcEnablednessResponse401> The API key has either expired or doesn't have the required scopes to query this
     * endpoint.
     *
     * | code  | description |
     * | ------------- | ------------- |
     * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
     * endpoint.  |
     * | TOKEN_INVALID  | Invalid API key or authorization header.  |
     *
     * @throws FetchError<403, types.V3BusinessRapcEnablednessResponse403> Authorization Error
     * @throws FetchError<404, types.V3BusinessRapcEnablednessResponse404> Resource Not Found
     * @throws FetchError<413, types.V3BusinessRapcEnablednessResponse413> The length of the request exceeded the maximum allowed
     * @throws FetchError<429, types.V3BusinessRapcEnablednessResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
     * limit for this endpoint. Try reducing the rate at which you make queries.
     * @throws FetchError<500, types.V3BusinessRapcEnablednessResponse500> Internal Server Error
     * @throws FetchError<503, types.V3BusinessRapcEnablednessResponse503> Service Unavailable
     */
    v3_business_rapc_enabledness(body: types.V3BusinessRapcEnablednessBodyParam, metadata: types.V3BusinessRapcEnablednessMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Returns Business Insights information for the provided businesses.
     * This endpoint is part of Yelp Fusion Insights, visit <a
     * href="https://business.yelp.com/data/products/fusion-insights/" target="_blank">Yelp
     * Fusion Insights</a> to learn more.
     *
     * @summary Business Insights
     * @throws FetchError<400, types.V3BusinessesInsightsResponse400> Bad Request. Message varies depending on failure scenario
     * @throws FetchError<401, types.V3BusinessesInsightsResponse401> The API key has either expired or doesn't have the required scopes to query this
     * endpoint.
     *
     * | code  | description |
     * | ------------- | ------------- |
     * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
     * endpoint.  |
     * | TOKEN_INVALID  | Invalid API key or authorization header.  |
     *
     * @throws FetchError<403, types.V3BusinessesInsightsResponse403> The API key provided is not currently able to query this endpoint.
     * @throws FetchError<404, types.V3BusinessesInsightsResponse404> Resource Not Found
     * @throws FetchError<413, types.V3BusinessesInsightsResponse413> The length of the request exceeded the maximum allowed
     * @throws FetchError<429, types.V3BusinessesInsightsResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
     * limit for this endpoint. Try reducing the rate at which you make queries.
     * @throws FetchError<500, types.V3BusinessesInsightsResponse500> Internal Server Error
     * @throws FetchError<503, types.V3BusinessesInsightsResponse503> Service Unavailable
     */
    v3_businesses_insights(metadata: types.V3BusinessesInsightsMetadataParam): Promise<FetchResponse<200, types.V3BusinessesInsightsResponse200>>;
    /**
     * This endpoint returns the list of food & drinks offered at the business, including what
     * is trending and the raw food ingredients needed.
     * This endpoint is part of Yelp Fusion Insights, visit <a
     * href="https://business.yelp.com/data/products/fusion-insights/" target="_blank">Yelp
     * Fusion Insights</a> to learn more.
     *
     * @summary Food & Drinks Insights
     * @throws FetchError<400, types.V3GetBusinessFoodAndDrinksInsightsResponse400> Bad Request. Message varies depending on failure scenario
     * @throws FetchError<401, types.V3GetBusinessFoodAndDrinksInsightsResponse401> The API key has either expired or doesn't have the required scopes to query this
     * endpoint.
     *
     * | code  | description |
     * | ------------- | ------------- |
     * | UNAUTHORIZED_API_KEY  | The API key provided is not currently able to query this
     * endpoint.  |
     * | TOKEN_INVALID  | Invalid API key or authorization header.  |
     *
     * @throws FetchError<403, types.V3GetBusinessFoodAndDrinksInsightsResponse403> The API key provided is not currently able to query this endpoint.
     * @throws FetchError<404, types.V3GetBusinessFoodAndDrinksInsightsResponse404> Resource Not Found
     * @throws FetchError<413, types.V3GetBusinessFoodAndDrinksInsightsResponse413> The length of the request exceeded the maximum allowed
     * @throws FetchError<429, types.V3GetBusinessFoodAndDrinksInsightsResponse429> You have either exceeded your daily quota, or have exceeded the queries-per-second
     * limit for this endpoint. Try reducing the rate at which you make queries.
     * @throws FetchError<500, types.V3GetBusinessFoodAndDrinksInsightsResponse500> Internal Server Error
     * @throws FetchError<503, types.V3GetBusinessFoodAndDrinksInsightsResponse503> Service Unavailable
     */
    v3_get_business_food_and_drinks_insights(metadata: types.V3GetBusinessFoodAndDrinksInsightsMetadataParam): Promise<FetchResponse<200, types.V3GetBusinessFoodAndDrinksInsightsResponse200>>;
}
declare const createSDK: SDK;
export default createSDK;
