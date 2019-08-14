docker run -p 8080:8080 -p 8443:8443 \
  -e SIMPLESAMLPHP_SP_ENTITY_ID=urn:memebase:fake-okta \
  -e SIMPLESAMLPHP_SP_ASSERTION_CONSUMER_SERVICE=http://localhost:4000/sso/sp/consume/okta \
  -e SIMPLESAMLPHP_SP_SINGLE_LOGOUT_SERVICE=http://localhost:4000/sso/sp/logout/okta \
  kristophjunge/test-saml-idp
