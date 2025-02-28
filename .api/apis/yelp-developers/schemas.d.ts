declare const V2AiChat: {
    readonly body: {
        readonly type: "object";
        readonly description: "This object captures the user’s request to the Fusion AI Chat endpoint. It includes\nthe conversational query, optional user context for more relevant results, and\nan optional chat_id for session continuity.\n";
        readonly properties: {
            readonly query: {
                readonly type: "string";
                readonly description: "• Natural language text for querying Yelp-specific information.\n• Accepts any prompt related to Yelp businesses, such as “Can you find a Thai restaurant near me?”\n• This should be plain text (no special formatting needed).\n";
                readonly maxLength: 1000;
            };
            readonly chat_id: {
                readonly type: "string";
                readonly description: "• Uniquely identifies the current conversation (chat session).\n• For the first request, set this to null or omit it; the API will respond with a new chat_id.\n• Use the returned chat_id on subsequent requests to continue the same conversation.\n• If omitted on subsequent requests, a new conversation is started.\n• If an invalid chat_id is provided, the request will fail.\n";
                readonly "x-nullable": true;
            };
            readonly user_context: {
                readonly type: "object";
                readonly description: "Contains optional location data (latitude and longitude) that can help the AI\ntailor results to a user’s location. If not provided and a location-based query\nis asked, the system may prompt the user to specify a location.\n";
                readonly properties: {
                    readonly latitude: {
                        readonly type: "number";
                        readonly description: "• User’s approximate latitude.\n• If provided, it helps return more location-specific results.\n• Otherwise, the system may ask for location details if needed (e.g., for searches).\n";
                        readonly format: "float";
                        readonly "x-nullable": true;
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly longitude: {
                        readonly type: "number";
                        readonly description: "• User’s approximate longitude.\n• If provided, it helps return more location-specific results.\n• Otherwise, the system may ask for location details if needed.\n";
                        readonly format: "float";
                        readonly "x-nullable": true;
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                };
            };
        };
        readonly required: readonly ["query"];
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly description: "Represents the AI Chat response returned by Yelp’s Fusion AI endpoint. It includes\na conversational response, any structured data (entities) relevant to the query,\nand a chat_id for tracking the user session.\n";
            readonly properties: {
                readonly chat_id: {
                    readonly type: "string";
                    readonly description: "A unique Yelp-generated Chat ID that ties all requests to a specific conversation.\n• This remains the same if the user provided a valid chat_id in the request.\n• It is static throughout one session.\n";
                };
                readonly response: {
                    readonly type: "object";
                    readonly description: "Contains a contextually relevant response message for the user’s query:\n• Might be one or multiple sentences.\n• May include follow-up questions if needed (e.g. to request user’s location).\n";
                    readonly properties: {
                        readonly text: {
                            readonly description: "The AI-generated textual response to the user’s query. For example, it may\ncontain an answer, an additional prompt, or instructions to refine the query.\n";
                            readonly type: "string";
                        };
                    };
                };
                readonly types: {
                    readonly type: "array";
                    readonly description: "A list of response categories indicating the nature of the answer. Valid values:\n• business_search\n• business_question\n• clarification\n• unsupported\n• confirmation\n";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly entities: {
                    readonly type: "array";
                    readonly description: "Structured data corresponding to the businesses or other entities referenced\nin the AI response. If the response does not reference specific businesses, this\narray may be empty.\n";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "An entity in the AI Chat response, typically containing a collection of businesses\nrelevant to the user’s query.\n";
                        readonly properties: {
                            readonly businesses: {
                                readonly type: "array";
                                readonly description: "A list of Yelp business objects that the AI response refers to. The data may be\npartially or fully populated depending on the nature of the query.\n";
                                readonly items: {
                                    readonly type: "object";
                                    readonly description: "Standard Yelp business object enhanced for AI Chat responses.\n";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "Name of this business.";
                                        };
                                        readonly alias: {
                                            readonly type: "string";
                                            readonly description: "Unique Yelp alias of this business. Can contain unicode characters.\nExample: 'yelp-san-francisco'. Also see <a href=\"https://docs.developer.yelp.com/docs/fusion-faq#whats-the-difference-between-the-yelp-business-id-and-business-alias\" target=\"_blank\">What's the difference between the Yelp business ID and business alias?</a>\n";
                                        };
                                        readonly url: {
                                            readonly type: "string";
                                            readonly description: "URL for business page on Yelp.";
                                        };
                                        readonly location: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly address1: {
                                                    readonly "x-nullable": true;
                                                    readonly description: "Street address of this business.";
                                                };
                                                readonly address2: {
                                                    readonly "x-nullable": true;
                                                    readonly description: "Street address of this business, continued.";
                                                };
                                                readonly address3: {
                                                    readonly "x-nullable": true;
                                                    readonly description: "Street address of this business, continued.";
                                                };
                                                readonly city: {
                                                    readonly "x-nullable": true;
                                                    readonly description: "City of this business.";
                                                };
                                                readonly state: {
                                                    readonly "x-nullable": true;
                                                    readonly description: "[ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.";
                                                };
                                                readonly zip_code: {
                                                    readonly "x-nullable": true;
                                                    readonly description: "[Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.";
                                                };
                                                readonly country: {
                                                    readonly "x-nullable": true;
                                                    readonly description: "[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.";
                                                };
                                            };
                                        };
                                        readonly coordinates: {
                                            readonly "x-nullable": true;
                                            readonly type: "object";
                                            readonly description: "Coordinates of this business.";
                                            readonly properties: {
                                                readonly latitude: {
                                                    readonly type: "number";
                                                    readonly description: "Latitude position on map.";
                                                };
                                                readonly longitude: {
                                                    readonly type: "number";
                                                    readonly description: "Longitude position on map.";
                                                };
                                            };
                                        };
                                        readonly review_count: {
                                            readonly type: "integer";
                                            readonly description: "Number of reviews for this business.";
                                        };
                                        readonly price: {
                                            readonly type: "string";
                                            readonly description: "Price level of the business. Value is one of *$*, *$$*, *$$$* or *$$$$*.";
                                            readonly "x-nullable": true;
                                        };
                                        readonly rating: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "Rating for this business (value ranges from 1, 1.5, ... 4.5, 5).";
                                            readonly "x-nullable": true;
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly categories: {
                                            readonly type: "array";
                                            readonly description: "A list of Yelp Categories";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly alias: {
                                                        readonly type: "string";
                                                        readonly description: "Alias of a category, when searching for business in certain categories, use alias rather than the title.";
                                                    };
                                                    readonly title: {
                                                        readonly type: "string";
                                                        readonly description: "Title of a category for display purpose.";
                                                    };
                                                };
                                            };
                                        };
                                        readonly attributes: {
                                            readonly type: "object";
                                            readonly description: "Various features or facilities provided by the business.";
                                            readonly additionalProperties: true;
                                        };
                                        readonly phone: {
                                            readonly type: "string";
                                            readonly description: "Phone number of the business.";
                                            readonly "x-nullable": true;
                                        };
                                        readonly summaries: {
                                            readonly type: "object";
                                            readonly description: "AI-generated textual summaries for this business. These are not specific to the user’s query.\n";
                                            readonly properties: {
                                                readonly short: {
                                                    readonly type: "string";
                                                    readonly description: "A short, typically single-sentence summary.";
                                                    readonly "x-nullable": true;
                                                };
                                                readonly medium: {
                                                    readonly type: "string";
                                                    readonly description: "A medium-length summary (2–3 sentences).";
                                                    readonly "x-nullable": true;
                                                };
                                                readonly long: {
                                                    readonly type: "string";
                                                    readonly description: "A more detailed paragraph-length summary.";
                                                    readonly "x-nullable": true;
                                                };
                                            };
                                        };
                                        readonly contextual_info: {
                                            readonly type: "object";
                                            readonly description: "Additional context relevant to the user’s specific query, if applicable.";
                                            readonly properties: {
                                                readonly summary: {
                                                    readonly type: "string";
                                                    readonly description: "A contextual summary relevant to the user’s query. May be null if not applicable.\n";
                                                    readonly "x-nullable": true;
                                                };
                                                readonly review_snippets: {
                                                    readonly type: "array";
                                                    readonly description: "Automatically selected short excerpts from user reviews, based on the query.";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly review_id: {
                                                                readonly type: "string";
                                                            };
                                                            readonly comment: {
                                                                readonly type: "string";
                                                            };
                                                            readonly rating: {
                                                                readonly type: "number";
                                                                readonly format: "double";
                                                                readonly minimum: -1.7976931348623157e+308;
                                                                readonly maximum: 1.7976931348623157e+308;
                                                            };
                                                            readonly timestamp: {
                                                                readonly "x-nullable": true;
                                                                readonly type: "integer";
                                                            };
                                                        };
                                                        readonly required: readonly ["review_id", "comment", "rating"];
                                                    };
                                                };
                                                readonly business_hours: {
                                                    readonly "x-nullable": true;
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly day_of_week: {
                                                                readonly type: "string";
                                                            };
                                                            readonly business_hours: {
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "object";
                                                                    readonly properties: {
                                                                        readonly open_time: {
                                                                            readonly type: "string";
                                                                        };
                                                                        readonly close_time: {
                                                                            readonly type: "string";
                                                                        };
                                                                    };
                                                                    readonly required: readonly ["open_time", "close_time"];
                                                                };
                                                            };
                                                        };
                                                        readonly required: readonly ["day_of_week", "business_hours"];
                                                    };
                                                };
                                                readonly photos: {
                                                    readonly "x-nullable": true;
                                                    readonly description: "A list of Yelp-hosted photo objects.\n";
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly original_url: {
                                                                readonly type: "string";
                                                            };
                                                        };
                                                        readonly required: readonly ["original_url"];
                                                    };
                                                };
                                                readonly review_snippet: {
                                                    readonly type: "string";
                                                    readonly description: "A single representative snippet from a review.\n";
                                                    readonly "x-nullable": true;
                                                };
                                            };
                                        };
                                    };
                                    readonly required: readonly ["id", "name", "location", "coordinates", "categories", "attributes", "summaries"];
                                };
                            };
                        };
                    };
                };
            };
            readonly required: readonly ["chat_id"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const V3BusinessInfo: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly business_id_or_alias: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A unique identifier for a Yelp Business. Can be either a 22-character Yelp Business ID, or a Yelp Business Alias.";
                };
            };
            readonly required: readonly ["business_id_or_alias"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly locale: {
                    readonly type: "string";
                    readonly pattern: "^[a-z]{2,3}_[A-Z]{2}$";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Locale code in the format of {language code}_{country code}. See the [list of supported locales](https://docs.developer.yelp.com/docs/resources-supported-locales).\n";
                };
                readonly device_platform: {
                    readonly type: "string";
                    readonly enum: readonly ["android", "ios", "mobile-generic"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Determines the platform for mobile_link";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "A full representation of a business";
            readonly type: "object";
            readonly required: readonly ["alias", "coordinates", "display_phone", "hours", "id", "is_claimed", "location", "name", "phone", "photos"];
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "Yelp Encrypted Business ID.";
                };
                readonly alias: {
                    readonly description: "Unique Yelp alias of this business. Can contain unicode characters.\nExample: 'yelp-san-francisco'. Also see <a href=\"https://docs.developer.yelp.com/docs/fusion-faq#whats-the-difference-between-the-yelp-business-id-and-business-alias\" target=\"_blank\">What's the difference between the Yelp business ID and business alias?</a>\n";
                    readonly type: "string";
                };
                readonly name: {
                    readonly description: "Name of this business.";
                    readonly type: "string";
                };
                readonly image_url: {
                    readonly description: "URL of photo for this business";
                    readonly type: "string";
                };
                readonly is_closed: {
                    readonly description: "Whether business has been (permanently) closed";
                    readonly type: "boolean";
                };
                readonly url: {
                    readonly description: "URL for business page on Yelp.";
                    readonly type: "string";
                };
                readonly review_count: {
                    readonly description: "Number of reviews for this business.";
                    readonly type: "integer";
                };
                readonly categories: {
                    readonly description: "List of category title and alias pairs associated with this business.";
                    readonly type: "array";
                    readonly items: {
                        readonly description: "A list of Yelp Categories.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "Category that the business falls in.";
                            readonly required: readonly ["alias", "title"];
                            readonly properties: {
                                readonly alias: {
                                    readonly description: "Alias of a category, when searching for business in certain categories, use alias rather than the title.";
                                    readonly type: "string";
                                };
                                readonly title: {
                                    readonly description: "Title of a category for display purpose.";
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
                readonly rating: {
                    readonly description: "Rating for this business (value ranges from 1, 1.5, ... 4.5, 5).";
                    readonly type: "decimal";
                };
                readonly coordinates: {
                    readonly type: "object";
                    readonly description: "Coordinates of this business.";
                    readonly required: readonly ["latitude", "longitude"];
                    readonly properties: {
                        readonly latitude: {
                            readonly description: "Latitude position on map.";
                            readonly type: "decimal";
                        };
                        readonly longitude: {
                            readonly description: "Longitude position on map.";
                            readonly type: "decimal";
                        };
                    };
                };
                readonly transactions: {
                    readonly description: "List of Yelp transactions that the business is registered for. Current supported values are **pickup**, **delivery** and **restaurant_reservation**.";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly price: {
                    readonly description: "Price level of the business. Uses the currency symbol of the provided <code>locale</code>. Value for <code>en_US</code> is one of *$*, *$$*, *$$$* or *$$$$*.";
                    readonly type: "string";
                };
                readonly location: {
                    readonly description: "Location of this business, including address, city, state, zip code and country.";
                    readonly type: "object";
                    readonly required: readonly ["display_address"];
                    readonly properties: {
                        readonly address1: {
                            readonly description: "Street address of this business.";
                            readonly type: "string";
                        };
                        readonly address2: {
                            readonly description: "Street address of this business, continued.";
                            readonly type: "string";
                        };
                        readonly address3: {
                            readonly description: "Street address of this business, continued.";
                            readonly type: "string";
                        };
                        readonly city: {
                            readonly description: "City of this business.";
                            readonly type: "string";
                        };
                        readonly zip_code: {
                            readonly description: "[Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.";
                            readonly type: "string";
                        };
                        readonly country: {
                            readonly description: "[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.";
                            readonly type: "string";
                        };
                        readonly state: {
                            readonly description: "[ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.";
                            readonly type: "string";
                        };
                        readonly display_address: {
                            readonly description: "Array of strings that if organized vertically give an address that is in the standard address format for the business's country.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly cross_streets: {
                            readonly type: "string";
                            readonly description: "Cross streets of this address";
                        };
                    };
                };
                readonly phone: {
                    readonly description: "Phone number of the business.";
                    readonly type: "string";
                };
                readonly display_phone: {
                    readonly description: "Phone number of the business formatted nicely to be displayed to users. The format is the standard phone number format for the business's country.";
                    readonly type: "string";
                };
                readonly distance: {
                    readonly description: "Distance in meters from the search location. This value is in meters(m) regardless of the locale.";
                    readonly type: "decimal";
                };
                readonly attributes: {
                    readonly description: "Various features or facilities provided by the business.\n**Yelp Fusion Premium tier** attributes, please apply [here](https://business.yelp.com/data/products/fusion/):\n* *liked_by_vegetarians* - is the business liked by vegetarians\n* *liked_by_vegans* - is the business liked by vegans\n* *hot_and_new* - has the business recently joined Yelp\n";
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
                readonly is_claimed: {
                    readonly type: "boolean";
                    readonly description: "Whether business has been claimed by a business owner";
                };
                readonly date_opened: {
                    readonly type: "string";
                    readonly description: "Business opening date";
                };
                readonly date_closed: {
                    readonly type: "string";
                    readonly description: "Business closing date";
                };
                readonly photos: {
                    readonly type: "array";
                    readonly description: "URLs of up to three photos of the business. <p> URLs of up to twelve photos of the business are available for **[Yelp Fusion Premium tier](https://business.yelp.com/data/products/fusion/)** users </p>";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly special_hours: {
                    readonly type: "array";
                    readonly description: "Out of the ordinary hours for the business that apply on certain dates. Whenever these are set, they will override the regular business hours found in the 'hours' field.";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["date"];
                        readonly properties: {
                            readonly date: {
                                readonly type: "string";
                                readonly format: "date";
                                readonly description: "An [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) date string representing the date for which these special hours apply.";
                            };
                            readonly start: {
                                readonly type: "string";
                                readonly description: "Start of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 1000 means 10 AM.";
                            };
                            readonly end: {
                                readonly type: "string";
                                readonly description: "End of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 2130 means 9:30 PM.";
                            };
                            readonly is_overnight: {
                                readonly type: "boolean";
                                readonly description: "Whether the special hours time range spans across midnight or not. When this is true, the end time will be lower than the start time.";
                            };
                            readonly is_closed: {
                                readonly type: "boolean";
                                readonly description: "Whether this particular special hour represents a date where the business is closed.";
                            };
                        };
                    };
                };
                readonly messaging: {
                    readonly type: "object";
                    readonly description: "Information and action links for messaging with this business via Yelp, including requesting quotes.";
                    readonly required: readonly ["url", "use_case_text"];
                    readonly properties: {
                        readonly url: {
                            readonly type: "string";
                            readonly description: "Visit this action link URL to go directly into the business messaging flow for this business.";
                        };
                        readonly use_case_text: {
                            readonly type: "string";
                            readonly description: "Indicates what kind of messaging can be done with the business.\ne.g., \"Request a Quote\" for a home services business, or \"Request a Consultation\" for a legal services business. This text will be localized (see <a href=\"https://docs.developer.yelp.com/docs/graphql-localization\" target=\"_blank\">Localization</a>).\n";
                        };
                        readonly response_rate: {
                            readonly type: "float";
                            readonly description: "Float number between 0 and 1, where 0 is never replies and 1 is always replies. <p>Yelp Fusion Premium tier, please apply [here](https://business.yelp.com/data/products/fusion/)</p>";
                        };
                        readonly response_time: {
                            readonly type: "integer";
                            readonly description: "Estimated response time in seconds. <p>Yelp Fusion Premium tier, please apply [here](https://business.yelp.com/data/products/fusion/)</p>";
                        };
                        readonly is_enabled: {
                            readonly type: "boolean";
                            readonly description: "Whether messaging is currently enabled. Access is disabled by default. See [Yelp Partner APIs](https://docs.developer.yelp.com/docs/yelp-partner-apis) on how to get access.";
                        };
                    };
                };
                readonly photo_count: {
                    readonly type: "integer";
                    readonly description: "Total number of photos <p>Yelp Fusion Premium tier, please apply [here](https://business.yelp.com/data/products/fusion/)</p>";
                };
                readonly photo_details: {
                    readonly type: "array";
                    readonly description: "List of photo details <p>Yelp Fusion Premium tier, please apply [here](https://business.yelp.com/data/products/fusion/)</p>";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly photo_id: {
                                readonly type: "string";
                                readonly description: "Unique identifier for a photo";
                            };
                            readonly url: {
                                readonly type: "string";
                                readonly description: "Photo URL";
                            };
                            readonly caption: {
                                readonly type: "string";
                                readonly description: "Photo caption";
                            };
                            readonly width: {
                                readonly type: "integer";
                                readonly description: "Photo width";
                            };
                            readonly height: {
                                readonly type: "integer";
                                readonly description: "Photo height";
                            };
                            readonly is_user_submitted: {
                                readonly type: "boolean";
                                readonly description: "Photo submitted by user";
                            };
                            readonly user_id: {
                                readonly type: "string";
                                readonly description: "Unique identifier for a user";
                            };
                            readonly label: {
                                readonly type: "string";
                                readonly description: "Photo label";
                            };
                        };
                    };
                };
                readonly yelp_menu_url: {
                    readonly type: "string";
                    readonly description: "Business menu URL <p>Yelp Fusion Premium tier, please apply [here](https://business.yelp.com/data/products/fusion/)</p>";
                };
                readonly cbsa: {
                    readonly type: "string";
                    readonly description: "Core based statistical area. <p>Fusion Insights Premium attribute, please apply [here](https://business.yelp.com/data/products/fusion-insights/)</p>";
                };
                readonly popularity_score: {
                    readonly type: "object";
                    readonly description: "Indicates popularity of a business with respect to other businesses belonging to the same primary category. <p>Fusion Insights Premium attributes, please apply [here](https://business.yelp.com/data/products/fusion-insights/)</p>";
                    readonly properties: {
                        readonly primary_category: {
                            readonly type: "string";
                            readonly description: "Business primary category";
                        };
                        readonly score: {
                            readonly type: "float";
                            readonly description: "Popularity score";
                        };
                    };
                };
                readonly rapc: {
                    readonly type: "object";
                    readonly description: "Information about Request a Phone Call for this business. Access is disabled by default. See [Yelp Partner APIs](https://docs.developer.yelp.com/docs/yelp-partner-apis) on how to get access.";
                    readonly properties: {
                        readonly is_enabled: {
                            readonly type: "boolean";
                            readonly description: "Whether Request a Phone Call is currently enabled. Request a Phone Call can be toggled via the [Enable/Disable Request a Phone Call endpoint](https://docs.developer.yelp.com/reference/v3_business_rapc_enabledness).";
                        };
                        readonly is_eligible: {
                            readonly type: "boolean";
                            readonly description: "Whether the given business is eligible for Request a Phone Call. The [Enable/Disable Request a Phone Call endpoint](https://docs.developer.yelp.com/reference/v3_business_rapc_enabledness) can only be used if the business is eligible.";
                        };
                    };
                };
                readonly hours: {
                    readonly type: "array";
                    readonly description: "Regular business hours.\n";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["hour_type", "open", "is_open_now"];
                        readonly properties: {
                            readonly hour_type: {
                                readonly type: "string";
                                readonly description: "Type of business hours";
                            };
                            readonly open: {
                                readonly type: "array";
                                readonly description: "List of open hours";
                                readonly items: {
                                    readonly type: "object";
                                    readonly required: readonly ["is_overnight", "start", "end", "day"];
                                    readonly properties: {
                                        readonly day: {
                                            readonly type: "integer";
                                            readonly description: "Day of the week.";
                                        };
                                        readonly start: {
                                            readonly type: "string";
                                            readonly description: "Start of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 1000 means 10 AM.";
                                        };
                                        readonly end: {
                                            readonly type: "string";
                                            readonly description: "End of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 2130 means 9:30 PM.";
                                        };
                                        readonly is_overnight: {
                                            readonly type: "boolean";
                                            readonly description: "Whether the special hours time range spans across midnight or not. When this is true, the end time will be lower than the start time.";
                                        };
                                    };
                                };
                            };
                            readonly is_open_now: {
                                readonly type: "boolean";
                                readonly description: "Whether the business is open now";
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const V3BusinessMatch: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: "string";
                    readonly maxLength: 64;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The name of the business. Only digits, letters, spaces, and !#$%&+,./:?@'are allowed.";
                };
                readonly address1: {
                    readonly type: "string";
                    readonly maxLength: 64;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The first line of the business's address. Only digits, letters, spaces, and '/#&,.: are allowed. An empty string is allowed; this will specifically match certain service businesses that have no street address.";
                };
                readonly address2: {
                    readonly type: "string";
                    readonly maxLength: 64;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The second line of the business's address. Only digits, letters, spaces, and '/#&,.: are allowed.";
                };
                readonly address3: {
                    readonly type: "string";
                    readonly maxLength: 64;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The third line of the business's address. Only digits, letters, spaces, and '/#&,.: are allowed.";
                };
                readonly city: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 64;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The city of the business. Only digits, letters, spaces, and '.() are allowed.";
                };
                readonly state: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 3;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.";
                };
                readonly country: {
                    readonly type: "string";
                    readonly minLength: 2;
                    readonly maxLength: 2;
                    readonly pattern: "[A-Z]{2}";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.";
                };
                readonly postal_code: {
                    readonly type: "string";
                    readonly maxLength: 12;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The [Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.";
                };
                readonly latitude: {
                    readonly type: "number";
                    readonly minimum: -90;
                    readonly maximum: 90;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Required, if _location_ is not provided. Latitude of the location to search from. If latitude is provided, longitude is required too.";
                };
                readonly longitude: {
                    readonly type: "number";
                    readonly minimum: -180;
                    readonly maximum: 180;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Required if _location_ is not provided. Longitude of the location to search from. If longitude is provided, latitude is required too.";
                };
                readonly phone: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 32;
                    readonly pattern: "^[0-9 +()-.x/]+$";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The phone number of the business which can be submitted as\n(a) locally formatted with digits only (e.g., 016703080) or\n(b) internationally formatted with a leading + sign and digits only after (+35316703080).\n";
                };
                readonly yelp_business_id: {
                    readonly type: "string";
                    readonly minLength: 22;
                    readonly maxLength: 22;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Yelp identifier of the business if available. Used as a hint when finding a matching business.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly default: 3;
                    readonly minimum: 1;
                    readonly maximum: 10;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Number of results to return.";
                };
                readonly match_threshold: {
                    readonly type: "string";
                    readonly default: "default";
                    readonly enum: readonly ["none", "default", "strict"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies whether a match quality threshold should be applied to the matched businesses. Must be one of the following.\n**none:** Do not apply any match quality threshold; all potential business matches will be returned.\n**default:** Apply a match quality threshold such that only very closely matching businesses will be returned.\n**strict:** Apply a very strict match quality threshold.\n";
                };
            };
            readonly required: readonly ["name", "address1", "city", "state", "country"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["businesses"];
            readonly properties: {
                readonly businesses: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["id", "alias", "coordinates", "location", "phone", "display_phone"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "Yelp Encrypted Business ID.";
                            };
                            readonly alias: {
                                readonly description: "Unique Yelp alias of this business. Can contain unicode characters.\nExample: 'yelp-san-francisco'. Also see [What's the difference between the Yelp business ID and business alias](https://docs.developer.yelp.com/docs/fusion-faq#whats-the-difference-between-the-yelp-business-id-and-business-alias)?\n";
                                readonly type: "string";
                            };
                            readonly name: {
                                readonly description: "Name of the business";
                                readonly type: "string";
                            };
                            readonly coordinates: {
                                readonly type: "object";
                                readonly description: "Coordinates of this business.";
                                readonly required: readonly ["latitude", "longitude"];
                                readonly properties: {
                                    readonly latitude: {
                                        readonly description: "Latitude position on map.";
                                        readonly type: "decimal";
                                    };
                                    readonly longitude: {
                                        readonly description: "Longitude position on map.";
                                        readonly type: "decimal";
                                    };
                                };
                            };
                            readonly location: {
                                readonly description: "Location of this business, including address, city, state, zip code and country.";
                                readonly type: "object";
                                readonly required: readonly ["display_address"];
                                readonly properties: {
                                    readonly address1: {
                                        readonly description: "Street address of this business.";
                                        readonly type: "string";
                                    };
                                    readonly address2: {
                                        readonly description: "Street address of this business, continued.";
                                        readonly type: "string";
                                    };
                                    readonly address3: {
                                        readonly description: "Street address of this business, continued.";
                                        readonly type: "string";
                                    };
                                    readonly city: {
                                        readonly description: "City of this business.";
                                        readonly type: "string";
                                    };
                                    readonly zip_code: {
                                        readonly description: "[Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.";
                                        readonly type: "string";
                                    };
                                    readonly country: {
                                        readonly description: "[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.";
                                        readonly type: "string";
                                    };
                                    readonly state: {
                                        readonly description: "[ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.";
                                        readonly type: "string";
                                    };
                                    readonly display_address: {
                                        readonly description: "Array of strings that if organized vertically give an address that is in the standard address format for the business's country.";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly cross_streets: {
                                        readonly type: "string";
                                        readonly description: "Cross streets of this address";
                                    };
                                };
                            };
                            readonly phone: {
                                readonly description: "Phone number of the business.";
                                readonly type: "string";
                            };
                            readonly display_phone: {
                                readonly description: "Phone number of the business formatted nicely to be displayed to users. The format is the standard phone number format for the business's country.";
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const V3BusinessPhoneSearch: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly phone: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 32;
                    readonly pattern: "^[0-9 +()-.x/]+$";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Phone number of the business you want to search for. It must start with + and include the country code, like +14159083801.";
                };
                readonly locale: {
                    readonly type: "string";
                    readonly pattern: "^[a-z]{2,3}_[A-Z]{2}$";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Locale code in the format of {language code}_{country code}. See the [list of supported locales](https://docs.developer.yelp.com/docs/resources-supported-locales).\n";
                };
            };
            readonly required: readonly ["phone"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["businesses", "total"];
            readonly properties: {
                readonly businesses: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "A Business Yelp finds based on the search criteria.";
                        readonly required: readonly ["id", "alias", "name", "location", "coordinates", "phone", "display_phone"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "Yelp Encrypted Business ID.";
                            };
                            readonly alias: {
                                readonly description: "Unique Yelp alias of this business. Can contain unicode characters.\nExample: 'yelp-san-francisco'. Also see <a href=\"https://docs.developer.yelp.com/docs/fusion-faq#whats-the-difference-between-the-yelp-business-id-and-business-alias\" target=\"_blank\">What's the difference between the Yelp business ID and business alias?</a>\n";
                                readonly type: "string";
                            };
                            readonly name: {
                                readonly description: "Name of this business.";
                                readonly type: "string";
                            };
                            readonly image_url: {
                                readonly description: "URL of photo for this business";
                                readonly type: "string";
                            };
                            readonly is_closed: {
                                readonly description: "Whether business has been (permanently) closed";
                                readonly type: "boolean";
                            };
                            readonly url: {
                                readonly description: "URL for business page on Yelp.";
                                readonly type: "string";
                            };
                            readonly review_count: {
                                readonly description: "Number of reviews for this business.";
                                readonly type: "integer";
                            };
                            readonly categories: {
                                readonly description: "List of category title and alias pairs associated with this business.";
                                readonly type: "array";
                                readonly items: {
                                    readonly description: "A list of Yelp Categories.";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly description: "Category that the business falls in.";
                                        readonly required: readonly ["alias", "title"];
                                        readonly properties: {
                                            readonly alias: {
                                                readonly description: "Alias of a category, when searching for business in certain categories, use alias rather than the title.";
                                                readonly type: "string";
                                            };
                                            readonly title: {
                                                readonly description: "Title of a category for display purpose.";
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly rating: {
                                readonly description: "Rating for this business (value ranges from 1, 1.5, ... 4.5, 5).";
                                readonly type: "decimal";
                            };
                            readonly coordinates: {
                                readonly type: "object";
                                readonly description: "Coordinates of this business.";
                                readonly required: readonly ["latitude", "longitude"];
                                readonly properties: {
                                    readonly latitude: {
                                        readonly description: "Latitude position on map.";
                                        readonly type: "decimal";
                                    };
                                    readonly longitude: {
                                        readonly description: "Longitude position on map.";
                                        readonly type: "decimal";
                                    };
                                };
                            };
                            readonly transactions: {
                                readonly description: "List of Yelp transactions that the business is registered for. Current supported values are **pickup**, **delivery** and **restaurant_reservation**.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly price: {
                                readonly description: "Price level of the business. Uses the currency symbol of the provided <code>locale</code>. Value for <code>en_US</code> is one of *$*, *$$*, *$$$* or *$$$$*.";
                                readonly type: "string";
                            };
                            readonly location: {
                                readonly description: "Location of this business, including address, city, state, zip code and country.";
                                readonly type: "object";
                                readonly required: readonly ["display_address"];
                                readonly properties: {
                                    readonly address1: {
                                        readonly description: "Street address of this business.";
                                        readonly type: "string";
                                    };
                                    readonly address2: {
                                        readonly description: "Street address of this business, continued.";
                                        readonly type: "string";
                                    };
                                    readonly address3: {
                                        readonly description: "Street address of this business, continued.";
                                        readonly type: "string";
                                    };
                                    readonly city: {
                                        readonly description: "City of this business.";
                                        readonly type: "string";
                                    };
                                    readonly zip_code: {
                                        readonly description: "[Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.";
                                        readonly type: "string";
                                    };
                                    readonly country: {
                                        readonly description: "[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.";
                                        readonly type: "string";
                                    };
                                    readonly state: {
                                        readonly description: "[ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.";
                                        readonly type: "string";
                                    };
                                    readonly display_address: {
                                        readonly description: "Array of strings that if organized vertically give an address that is in the standard address format for the business's country.";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly cross_streets: {
                                        readonly type: "string";
                                        readonly description: "Cross streets of this address";
                                    };
                                };
                            };
                            readonly phone: {
                                readonly description: "Phone number of the business.";
                                readonly type: "string";
                            };
                            readonly display_phone: {
                                readonly description: "Phone number of the business formatted nicely to be displayed to users. The format is the standard phone number format for the business's country.";
                                readonly type: "string";
                            };
                            readonly distance: {
                                readonly description: "Distance in meters from the search location. This value is in meters(m) regardless of the locale.";
                                readonly type: "decimal";
                            };
                            readonly attributes: {
                                readonly description: "Various features or facilities provided by the business.\n**Yelp Fusion Premium tier** attributes, please apply [here](https://business.yelp.com/data/products/fusion/):\n* *liked_by_vegetarians* - is the business liked by vegetarians\n* *liked_by_vegans* - is the business liked by vegans\n* *hot_and_new* - has the business recently joined Yelp\n";
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                        };
                    };
                };
                readonly total: {
                    readonly description: "Total number of businesses Yelp finds based on the search criteria. Sometimes, the value may exceed 240. In such case, you still can only get up to 240 businesses using multiple queries and combinations of the \"limit\" and \"offset\" parameters.\n";
                    readonly type: "integer";
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const V3BusinessRapcEnabledness: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly is_enabled: {
                readonly type: "boolean";
                readonly description: "Whether RaPC should be enabled";
            };
        };
        readonly required: readonly ["is_enabled"];
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly business_id_or_alias: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A unique identifier for a Yelp Business. Can be either a 22-character Yelp Business ID, or a Yelp Business Alias.";
                };
            };
            readonly required: readonly ["business_id_or_alias"];
        }];
    };
    readonly response: {
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const V3BusinessSearch: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly location: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 250;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Required if either *latitude* or *longitude* is not provided.\nThis string indicates the geographic area to be used when searching for businesses.\nExamples: \"New York City\", \"NYC\", \"350 5th Ave, New York, NY 10118\".\nBusinesses returned in the response may not be strictly within the specified location.\n";
                };
                readonly latitude: {
                    readonly type: "number";
                    readonly minimum: -90;
                    readonly maximum: 90;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Required, if _location_ is not provided. Latitude of the location to search from. If latitude is provided, longitude is required too.";
                };
                readonly longitude: {
                    readonly type: "number";
                    readonly minimum: -180;
                    readonly maximum: 180;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Required if _location_ is not provided. Longitude of the location to search from. If longitude is provided, latitude is required too.";
                };
                readonly term: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Search term, e.g. \"food\" or \"restaurants\".\nThe term may also be the business's name, such as \"Starbucks\". If term is not included the endpoint will default to searching across businesses from a small number of popular categories.\n";
                };
                readonly radius: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly maximum: 40000;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A suggested search radius in meters. This field is used as a suggestion to the search. The actual search radius may be lower than the suggested radius in dense urban areas, and higher in regions of less business density.\nIf the specified value is too large, a AREA_TOO_LARGE error may be returned. The max value is 40,000 meters (about 25 miles).\n";
                };
                readonly categories: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly uniqueItems: true;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Categories to filter the search results with. See the list of supported categories. The category filter can be a list of comma delimited categories.\ne.g., \"bars,french\" will filter by Bars OR French.\nThe category alias should be used (e.g. \"discgolf\", not \"Disc Golf\").\n";
                };
                readonly locale: {
                    readonly type: "string";
                    readonly pattern: "^[a-z]{2,3}_[A-Z]{2}$";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Locale code in the format of {language code}_{country code}. See the [list of supported locales](https://docs.developer.yelp.com/docs/resources-supported-locales).\n";
                };
                readonly price: {
                    readonly type: "array";
                    readonly maxItems: 4;
                    readonly uniqueItems: true;
                    readonly items: {
                        readonly type: "integer";
                        readonly minimum: 1;
                        readonly maximum: 4;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Pricing levels to filter the search result with: 1 = $, 2 = $$, 3 = $$$, 4 = $$$$. The price filter can be a list of comma delimited pricing levels.\ne.g., \"1, 2, 3\" will filter the results to show the ones that are $, $$, or $$$.\n";
                };
                readonly open_now: {
                    readonly type: "boolean";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "When set to true, only return the businesses that are open now.\nNotice that _open_at_ and _open_now_ cannot be used together.\n";
                };
                readonly open_at: {
                    readonly type: "integer";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "An integer representing the Unix time in the timezone of the search location. If specified, it will return businesses open at the given time.\nNotice that *open_at* and *open_now* cannot be used together.\n";
                };
                readonly attributes: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Try these additional filters to return specific search results!\n- *hot_and_new* - popular businesses which recently joined Yelp\n- *request_a_quote* - businesses which actively reply to Request a Quote inquiries\n- *reservation* - businesses with Yelp Reservations bookings enabled on their profile page\n- *waitlist_reservation* - businesses with Yelp _Wait List_ bookings enabled on their profile screen (iOS/Android)\n- *deals* - businesses offering Yelp Deals on their profile page\n- *gender_neutral_restrooms* - businesses which provide gender neutral restrooms\n- *open_to_all* - businesses which are Open To All\n- *wheelchair_accessible* - businesses which are Wheelchair Accessible\n\n**Premium Search Filters, available to users with a [Fusion Premium Plan](https://business.yelp.com/data/products/fusion/):\n- Ambience\n  - *ambience* - ambience of the business\n  - *ambience_casual* - is the ambience at the business casual\n  - *ambience_classy* - is the ambience at the business classy\n  - *ambience_divey* - is the ambience at the business divey\n  - *ambience_hipster* - is the ambience at the business hippy\n  - *ambience_intimate* - is the ambience at the business intimate\n  - *ambience_romantic* - is the ambience at the business romantic\n  - *ambience_touristy* - is the ambience at the business touristy\n  - *ambience_trendy* - is the ambience at the business trendy\n  - *ambience_upscale* - is the ambience at the business upscale\n- *dogs_allowed* - dog-friendly businesses\n- *good_for_dancing* - businesses which are good for dancing\n- *happy_hour* - businesses which have happy hour specials\n- Liked by\n  - *liked_by_beer* - businesses liked by people who drink beer\n  - *liked_by_dates* - businesses liked by people who are on a date\n  - *liked_by_fifties* - businesses liked by people who are in their fiftees\n  - *liked_by_forties* - businesses liked by people who are in their forties\n  - *liked_by_genx* - businesses liked by people who belong to Generation X\n  - *liked_by_thirties* - businesses liked by people who are in their thirties\n  - *liked_by_twenties* - businesses liked by people who are in their twenties\n  - *liked_by_men* - businesses liked by men\n  - *liked_by_students* - businesses liked by Students\n  - *liked_by_travelers* - businesses liked by people who are travelling\n  - *liked_by_vegetarians* - businesses which are liked by vegetarians\n  - *liked_by_wine* - businesses liked by people who drink wine\n  - *liked_by_women* - businesses liked by women\n  - *liked_by_young_professionals* - businesses liked by young prefessionals\n- Noise level\n  - *noise_level* - noise level at the business\n  - *noise_level_average* - is the noise level average\n  - *noise_level_loud* - is the noise level loud\n  - *noise_level_quiet* - is the noise level quiet\n  - *noise_level_very_loud* - is the noise level very loud\n- *outdoor_seating* - businesses with outdoor seating areas\n- Parking\n  - *parking* - businesses with parking\n  - *parking_garage* - businesses which itself has a garage or there is a parking garage nearby\n  - *parking_lot* - businesses which have a parking lot\n  - *parking_street* - businesses with street parking available nearby\n  - *parking_valet* - businesses which offer a valet parking\n  - *parking_validated* - businesses which can validate a parking ticket from an external parking\n  - *parking_bike* - businesses with bike parking type\n- *restaurants_delivery* - restaurants which offer delivery service\n- *restaurants_takeout* - restaurants with take-out option\n- WiFi\n  - *wifi* - businesses with WiFi\n  - *wifi_free* - businesses with free WiFi\n  - *wifi_paid* - businesses with paid WiFi\n\nYou can combine multiple attributes by providing a comma separated like \"attribute1,attribute2\".\nIf multiple attributes are used, only businesses that satisfy all the attributes will be returned in search results.\ne.g., the attributes \"*hot_and_new*,*request_a_quote*\" will return businesses that are 'Hot and New', and offer 'Request a Quote'.\n";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly default: "best_match";
                    readonly enum: readonly ["best_match", "rating", "review_count", "distance"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Suggestion to the search algorithm that the results be sorted by one of the these modes: *best_match*, *rating*, *review_count* or *distance*.\nThe default is *best_match*. Note that specifying the sort_by is a suggestion (not strictly enforced) to Yelp's search, which considers multiple input parameters to return the most relevant results.\n\ne.g., the *rating* sort is not strictly sorted by the rating value, but by an adjusted rating value that takes into account the number of ratings,\nsimilar to a Bayesian average. This is to prevent skewing results to businesses with a single review.\n";
                };
                readonly device_platform: {
                    readonly type: "string";
                    readonly enum: readonly ["android", "ios", "mobile-generic"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Determines the platform for mobile_link";
                };
                readonly reservation_date: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The date for the reservation, format is YYYY-mm-dd";
                };
                readonly reservation_time: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The time of the requested reservation, format is HH:MM";
                };
                readonly reservation_covers: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "How many people are attending the reservation";
                };
                readonly matches_party_size_param: {
                    readonly type: "boolean";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Whether to filter out results that don't have openings matching the params";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly default: 20;
                    readonly minimum: 0;
                    readonly maximum: 50;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Number of results to return.";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly maximum: 1000;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Offset the list of returned results by this amount.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["businesses", "total", "region"];
            readonly properties: {
                readonly businesses: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "A Business Yelp finds based on the search criteria.";
                        readonly required: readonly ["id", "alias", "name", "location", "coordinates", "phone", "display_phone"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "Yelp Encrypted Business ID.";
                            };
                            readonly alias: {
                                readonly description: "Unique Yelp alias of this business. Can contain unicode characters.\nExample: 'yelp-san-francisco'. Also see <a href=\"https://docs.developer.yelp.com/docs/fusion-faq#whats-the-difference-between-the-yelp-business-id-and-business-alias\" target=\"_blank\">What's the difference between the Yelp business ID and business alias?</a>\n";
                                readonly type: "string";
                            };
                            readonly name: {
                                readonly description: "Name of this business.";
                                readonly type: "string";
                            };
                            readonly image_url: {
                                readonly description: "URL of photo for this business";
                                readonly type: "string";
                            };
                            readonly is_closed: {
                                readonly description: "Whether business has been (permanently) closed";
                                readonly type: "boolean";
                            };
                            readonly url: {
                                readonly description: "URL for business page on Yelp.";
                                readonly type: "string";
                            };
                            readonly review_count: {
                                readonly description: "Number of reviews for this business.";
                                readonly type: "integer";
                            };
                            readonly categories: {
                                readonly description: "List of category title and alias pairs associated with this business.";
                                readonly type: "array";
                                readonly items: {
                                    readonly description: "A list of Yelp Categories.";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly description: "Category that the business falls in.";
                                        readonly required: readonly ["alias", "title"];
                                        readonly properties: {
                                            readonly alias: {
                                                readonly description: "Alias of a category, when searching for business in certain categories, use alias rather than the title.";
                                                readonly type: "string";
                                            };
                                            readonly title: {
                                                readonly description: "Title of a category for display purpose.";
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly rating: {
                                readonly description: "Rating for this business (value ranges from 1, 1.5, ... 4.5, 5).";
                                readonly type: "decimal";
                            };
                            readonly coordinates: {
                                readonly type: "object";
                                readonly description: "Coordinates of this business.";
                                readonly required: readonly ["latitude", "longitude"];
                                readonly properties: {
                                    readonly latitude: {
                                        readonly description: "Latitude position on map.";
                                        readonly type: "decimal";
                                    };
                                    readonly longitude: {
                                        readonly description: "Longitude position on map.";
                                        readonly type: "decimal";
                                    };
                                };
                            };
                            readonly transactions: {
                                readonly description: "List of Yelp transactions that the business is registered for. Current supported values are **pickup**, **delivery** and **restaurant_reservation**.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly price: {
                                readonly description: "Price level of the business. Uses the currency symbol of the provided <code>locale</code>. Value for <code>en_US</code> is one of *$*, *$$*, *$$$* or *$$$$*.";
                                readonly type: "string";
                            };
                            readonly location: {
                                readonly description: "Location of this business, including address, city, state, zip code and country.";
                                readonly type: "object";
                                readonly required: readonly ["display_address"];
                                readonly properties: {
                                    readonly address1: {
                                        readonly description: "Street address of this business.";
                                        readonly type: "string";
                                    };
                                    readonly address2: {
                                        readonly description: "Street address of this business, continued.";
                                        readonly type: "string";
                                    };
                                    readonly address3: {
                                        readonly description: "Street address of this business, continued.";
                                        readonly type: "string";
                                    };
                                    readonly city: {
                                        readonly description: "City of this business.";
                                        readonly type: "string";
                                    };
                                    readonly zip_code: {
                                        readonly description: "[Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.";
                                        readonly type: "string";
                                    };
                                    readonly country: {
                                        readonly description: "[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.";
                                        readonly type: "string";
                                    };
                                    readonly state: {
                                        readonly description: "[ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.";
                                        readonly type: "string";
                                    };
                                    readonly display_address: {
                                        readonly description: "Array of strings that if organized vertically give an address that is in the standard address format for the business's country.";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly cross_streets: {
                                        readonly type: "string";
                                        readonly description: "Cross streets of this address";
                                    };
                                };
                            };
                            readonly phone: {
                                readonly description: "Phone number of the business.";
                                readonly type: "string";
                            };
                            readonly display_phone: {
                                readonly description: "Phone number of the business formatted nicely to be displayed to users. The format is the standard phone number format for the business's country.";
                                readonly type: "string";
                            };
                            readonly distance: {
                                readonly description: "Distance in meters from the search location. This value is in meters(m) regardless of the locale.";
                                readonly type: "decimal";
                            };
                            readonly attributes: {
                                readonly description: "Various features or facilities provided by the business.\n**Yelp Fusion Premium tier** attributes, please apply [here](https://business.yelp.com/data/products/fusion/):\n* *liked_by_vegetarians* - is the business liked by vegetarians\n* *liked_by_vegans* - is the business liked by vegans\n* *hot_and_new* - has the business recently joined Yelp\n";
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly business_hours: {
                                readonly type: "array";
                                readonly description: "Regular business hours.\n";
                                readonly items: {
                                    readonly type: "object";
                                    readonly required: readonly ["hour_type", "open", "is_open_now"];
                                    readonly properties: {
                                        readonly hour_type: {
                                            readonly type: "string";
                                            readonly description: "Type of business hours";
                                        };
                                        readonly open: {
                                            readonly type: "array";
                                            readonly description: "List of open hours";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly required: readonly ["is_overnight", "start", "end", "day"];
                                                readonly properties: {
                                                    readonly day: {
                                                        readonly type: "integer";
                                                        readonly description: "Day of the week.";
                                                    };
                                                    readonly start: {
                                                        readonly type: "string";
                                                        readonly description: "Start of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 1000 means 10 AM.";
                                                    };
                                                    readonly end: {
                                                        readonly type: "string";
                                                        readonly description: "End of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 2130 means 9:30 PM.";
                                                    };
                                                    readonly is_overnight: {
                                                        readonly type: "boolean";
                                                        readonly description: "Whether the special hours time range spans across midnight or not. When this is true, the end time will be lower than the start time.";
                                                    };
                                                };
                                            };
                                        };
                                        readonly is_open_now: {
                                            readonly type: "boolean";
                                            readonly description: "Whether the business is open now";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly total: {
                    readonly description: "Total number of businesses Yelp finds based on the search criteria. Sometimes, the value may exceed 240. In such case, you still can only get up to 240 businesses using multiple queries and combinations of the \"limit\" and \"offset\" parameters.\n";
                    readonly type: "integer";
                };
                readonly region: {
                    readonly description: "Suggested area in a map to display results in.";
                    readonly type: "object";
                    readonly required: readonly ["center"];
                    readonly properties: {
                        readonly center: {
                            readonly type: "object";
                            readonly description: "Center location of the region.";
                            readonly required: readonly ["latitude", "longitude"];
                            readonly properties: {
                                readonly latitude: {
                                    readonly description: "Latitude position on map.";
                                    readonly type: "decimal";
                                };
                                readonly longitude: {
                                    readonly description: "Longitude position on map.";
                                    readonly type: "decimal";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const V3BusinessServiceOfferings: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly business_id_or_alias: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A unique identifier for a Yelp Business. Can be either a 22-character Yelp Business ID, or a Yelp Business Alias.";
                };
            };
            readonly required: readonly ["business_id_or_alias"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly locale: {
                    readonly type: "string";
                    readonly pattern: "^[a-z]{2,3}_[A-Z]{2}$";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Locale code in the format of {language code}_{country code}. See the [list of supported locales](https://docs.developer.yelp.com/docs/resources-supported-locales).\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["active", "eligible"];
            readonly properties: {
                readonly active: {
                    readonly type: "array";
                    readonly description: "List of service offerings that are currently active";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly eligible: {
                    readonly type: "array";
                    readonly description: "List of all service offerings that the business is eligible for";
                    readonly items: {
                        readonly type: "string";
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const V3BusinessesInsights: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly business_ids: {
                    readonly type: "array";
                    readonly maxItems: 20;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Business Id or alias of the businesses for which to get data";
                };
                readonly date_range_start: {
                    readonly type: "string";
                    readonly pattern: "^(19|20)\\d\\d(0[1-9]|1[012])$";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Start of the date range during which to get data. Accepted format is \"YYYYMM\".";
                };
                readonly date_range_end: {
                    readonly type: "string";
                    readonly pattern: "^(19|20)\\d\\d(0[1-9]|1[012])$";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "End of the date range during which to get data. Accepted format is \"YYYYMM\".";
                };
            };
            readonly required: readonly ["business_ids", "date_range_start", "date_range_end"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["insights"];
            readonly properties: {
                readonly insights: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["business_id"];
                        readonly properties: {
                            readonly business_id: {
                                readonly type: "string";
                                readonly description: "Yelp Encrypted Business ID.";
                            };
                            readonly popularity_scores: {
                                readonly type: "object";
                                readonly required: readonly ["date", "primary_category", "score"];
                                readonly properties: {
                                    readonly date: {
                                        readonly type: "string";
                                        readonly description: "Date for which the metrics is available";
                                        readonly pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$";
                                    };
                                    readonly primary_category: {
                                        readonly type: "string";
                                        readonly description: "Primary category the business is associated with";
                                    };
                                    readonly score: {
                                        readonly type: "float";
                                        readonly description: "Score is a floating-point value on a scale of 0-100 to measure a business' popularity";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const V3GetBusinessFoodAndDrinksInsights: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly business_id_or_alias: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A unique identifier for a Yelp Business. Can be either a 22-character Yelp Business ID, or a Yelp Business Alias.";
                };
            };
            readonly required: readonly ["business_id_or_alias"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly locale: {
                    readonly type: "string";
                    readonly pattern: "^[a-z]{2,3}_[A-Z]{2}$";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Locale code in the format of {language code}_{country code}. See the [list of supported locales](https://docs.developer.yelp.com/docs/resources-supported-locales).\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["food", "drinks"];
            readonly properties: {
                readonly food: {
                    readonly type: "array";
                    readonly description: "List of food items offered by the business";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["name", "ingredients", "tags", "mentions"];
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "name of the item";
                            };
                            readonly ingredients: {
                                readonly type: "array";
                                readonly description: "ingredients that go into this item";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly tags: {
                                readonly type: "array";
                                readonly description: "tags associated with the item";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly mentions: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly reviews: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "number of times this item is mentioned in reviews";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly photos: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "number of times this item is mentioned in photo captions";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["reviews", "photos"];
                            };
                        };
                    };
                };
                readonly drinks: {
                    readonly type: "array";
                    readonly description: "List of drinks offered by the business";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["name", "tags", "mentions"];
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "name of the item";
                            };
                            readonly tags: {
                                readonly type: "array";
                                readonly description: "tags associated with the item";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly mentions: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly reviews: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "number of times this item is mentioned in reviews";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly photos: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "number of times this item is mentioned in photo captions";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                };
                                readonly required: readonly ["reviews", "photos"];
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const V3GetBusinessesEngagement: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly business_ids: {
                    readonly type: "array";
                    readonly maxItems: 20;
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Business Id or alias of the businesses for which to get data.";
                };
                readonly date_range_start: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Start of the date range during which to get metrics. Defaults to the beginning of the most recently available week.";
                };
                readonly date_range_end: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "End of the date range during which to get metrics. Defaults to the end of the most recently available week.";
                };
            };
            readonly required: readonly ["business_ids"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["data"];
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["business_id", "metrics"];
                        readonly properties: {
                            readonly business_id: {
                                readonly type: "string";
                                readonly description: "Yelp Encrypted Business ID.";
                            };
                            readonly metrics: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly required: readonly ["start_of_week_date"];
                                    readonly properties: {
                                        readonly start_of_week_date: {
                                            readonly type: "string";
                                            readonly description: "Start date of the week for which metrics was requested.";
                                            readonly pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$";
                                        };
                                        readonly engagement_metric: {
                                            readonly type: "integer";
                                            readonly description: "Score on a scale of 1-20 to measure consumer engagement of a particular business";
                                        };
                                        readonly intent_metric: {
                                            readonly type: "integer";
                                            readonly description: "Score on a scale of 1-10 to measure consumer intent of a particular business";
                                        };
                                        readonly transaction_metric: {
                                            readonly type: "integer";
                                            readonly description: "Score on a scale of 1-4 to measure consumer transaction with a particular business";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const V3TransactionSearch: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly transaction_type: {
                    readonly type: "string";
                    readonly default: "delivery";
                    readonly enum: readonly ["delivery"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Type of transaction supported by the business";
                };
            };
            readonly required: readonly ["transaction_type"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly latitude: {
                    readonly type: "number";
                    readonly minimum: -90;
                    readonly maximum: 90;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Required, if _location_ is not provided. Latitude of the location to search from. If latitude is provided, longitude is required too.";
                };
                readonly longitude: {
                    readonly type: "number";
                    readonly minimum: -180;
                    readonly maximum: 180;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Required if _location_ is not provided. Longitude of the location to search from. If longitude is provided, latitude is required too.";
                };
                readonly location: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 250;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Required if either *latitude* or *longitude* is not provided.\nThis string indicates the geographic area to be used when searching for businesses.\nExamples: \"New York City\", \"NYC\", \"350 5th Ave, New York, NY 10118\".\nBusinesses returned in the response may not be strictly within the specified location.\n";
                };
                readonly term: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Search term, e.g. \"food\" or \"restaurants\".\nThe term may also be the business's name, such as \"Starbucks\". If term is not included the endpoint will default to searching across businesses from a small number of popular categories.\n";
                };
                readonly categories: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly uniqueItems: true;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Categories to filter the search results with. See the list of supported categories. The category filter can be a list of comma delimited categories.\ne.g., \"bars,french\" will filter by Bars OR French.\nThe category alias should be used (e.g. \"discgolf\", not \"Disc Golf\").\n";
                };
                readonly price: {
                    readonly type: "array";
                    readonly maxItems: 4;
                    readonly uniqueItems: true;
                    readonly items: {
                        readonly type: "integer";
                        readonly minimum: 1;
                        readonly maximum: 4;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Pricing levels to filter the search result with: 1 = $, 2 = $$, 3 = $$$, 4 = $$$$. The price filter can be a list of comma delimited pricing levels.\ne.g., \"1, 2, 3\" will filter the results to show the ones that are $, $$, or $$$.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["total", "businesses"];
            readonly properties: {
                readonly businesses: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "A Business Yelp finds based on the search criteria.";
                        readonly required: readonly ["id", "alias", "name", "location", "coordinates", "phone", "display_phone"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "Yelp Encrypted Business ID.";
                            };
                            readonly alias: {
                                readonly description: "Unique Yelp alias of this business. Can contain unicode characters.\nExample: 'yelp-san-francisco'. Also see <a href=\"https://docs.developer.yelp.com/docs/fusion-faq#whats-the-difference-between-the-yelp-business-id-and-business-alias\" target=\"_blank\">What's the difference between the Yelp business ID and business alias?</a>\n";
                                readonly type: "string";
                            };
                            readonly name: {
                                readonly description: "Name of this business.";
                                readonly type: "string";
                            };
                            readonly image_url: {
                                readonly description: "URL of photo for this business";
                                readonly type: "string";
                            };
                            readonly is_closed: {
                                readonly description: "Whether business has been (permanently) closed";
                                readonly type: "boolean";
                            };
                            readonly url: {
                                readonly description: "URL for business page on Yelp.";
                                readonly type: "string";
                            };
                            readonly review_count: {
                                readonly description: "Number of reviews for this business.";
                                readonly type: "integer";
                            };
                            readonly categories: {
                                readonly description: "List of category title and alias pairs associated with this business.";
                                readonly type: "array";
                                readonly items: {
                                    readonly description: "A list of Yelp Categories.";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly description: "Category that the business falls in.";
                                        readonly required: readonly ["alias", "title"];
                                        readonly properties: {
                                            readonly alias: {
                                                readonly description: "Alias of a category, when searching for business in certain categories, use alias rather than the title.";
                                                readonly type: "string";
                                            };
                                            readonly title: {
                                                readonly description: "Title of a category for display purpose.";
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly rating: {
                                readonly description: "Rating for this business (value ranges from 1, 1.5, ... 4.5, 5).";
                                readonly type: "decimal";
                            };
                            readonly coordinates: {
                                readonly type: "object";
                                readonly description: "Coordinates of this business.";
                                readonly required: readonly ["latitude", "longitude"];
                                readonly properties: {
                                    readonly latitude: {
                                        readonly description: "Latitude position on map.";
                                        readonly type: "decimal";
                                    };
                                    readonly longitude: {
                                        readonly description: "Longitude position on map.";
                                        readonly type: "decimal";
                                    };
                                };
                            };
                            readonly transactions: {
                                readonly description: "List of Yelp transactions that the business is registered for. Current supported values are **pickup**, **delivery** and **restaurant_reservation**.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly price: {
                                readonly description: "Price level of the business. Uses the currency symbol of the provided <code>locale</code>. Value for <code>en_US</code> is one of *$*, *$$*, *$$$* or *$$$$*.";
                                readonly type: "string";
                            };
                            readonly location: {
                                readonly description: "Location of this business, including address, city, state, zip code and country.";
                                readonly type: "object";
                                readonly required: readonly ["display_address"];
                                readonly properties: {
                                    readonly address1: {
                                        readonly description: "Street address of this business.";
                                        readonly type: "string";
                                    };
                                    readonly address2: {
                                        readonly description: "Street address of this business, continued.";
                                        readonly type: "string";
                                    };
                                    readonly address3: {
                                        readonly description: "Street address of this business, continued.";
                                        readonly type: "string";
                                    };
                                    readonly city: {
                                        readonly description: "City of this business.";
                                        readonly type: "string";
                                    };
                                    readonly zip_code: {
                                        readonly description: "[Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.";
                                        readonly type: "string";
                                    };
                                    readonly country: {
                                        readonly description: "[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.";
                                        readonly type: "string";
                                    };
                                    readonly state: {
                                        readonly description: "[ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.";
                                        readonly type: "string";
                                    };
                                    readonly display_address: {
                                        readonly description: "Array of strings that if organized vertically give an address that is in the standard address format for the business's country.";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly cross_streets: {
                                        readonly type: "string";
                                        readonly description: "Cross streets of this address";
                                    };
                                };
                            };
                            readonly phone: {
                                readonly description: "Phone number of the business.";
                                readonly type: "string";
                            };
                            readonly display_phone: {
                                readonly description: "Phone number of the business formatted nicely to be displayed to users. The format is the standard phone number format for the business's country.";
                                readonly type: "string";
                            };
                            readonly distance: {
                                readonly description: "Distance in meters from the search location. This value is in meters(m) regardless of the locale.";
                                readonly type: "decimal";
                            };
                            readonly attributes: {
                                readonly description: "Various features or facilities provided by the business.\n**Yelp Fusion Premium tier** attributes, please apply [here](https://business.yelp.com/data/products/fusion/):\n* *liked_by_vegetarians* - is the business liked by vegetarians\n* *liked_by_vegans* - is the business liked by vegans\n* *hot_and_new* - has the business recently joined Yelp\n";
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                        };
                    };
                };
                readonly total: {
                    readonly description: "Total number of businesses Yelp finds based on the search criteria. Sometimes, the value may exceed 240. In such case, you still can only get up to 240 businesses using multiple queries and combinations of the \"limit\" and \"offset\" parameters.\n";
                    readonly type: "integer";
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "description"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "The error code.";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description of the error.";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { V2AiChat, V3BusinessInfo, V3BusinessMatch, V3BusinessPhoneSearch, V3BusinessRapcEnabledness, V3BusinessSearch, V3BusinessServiceOfferings, V3BusinessesInsights, V3GetBusinessFoodAndDrinksInsights, V3GetBusinessesEngagement, V3TransactionSearch };
