---
layout: default
title: CAS - Configuring SSO Session Cookie
category: SSO & SLO
---

# SSO Session Cookie

A ticket-granting cookie is an HTTP cookie set by CAS upon the establishment of a single sign-on session. This cookie maintains login
state for the client, and while it is valid, the client can present it to CAS in lieu of primary credentials.
Services can opt out of single sign-on through the `renew` parameter or the CAS server may conditionally opt the service out
based on the policies defined for the application in the service registry. See the [CAS Protocol](../protocol/CAS-Protocol.html) for more info.

The cookie value is linked to the active ticket-granting ticket, the remote IP address that initiated the request
as well as the user agent that submitted the request. The final cookie value is then encrypted and signed. 

These keys **MUST** be regenerated per your specific environment. Each key
is a JSON Web Token with a defined length per the algorithm used for encryption and signing.

In the event that keys are not generated by the deployer, CAS will attempt to auto-generate keys and will output
the result for each respected key. The deployer MUST attempt to copy the generated keys over to the appropriate
settings in their CAS properties file, specially when running a multi-node CAS deployment. Failure to do so will prevent CAS
to appropriate decrypt and encrypt the cookie value and will prevent successful single sign-on.

<div class="alert alert-info"><strong>SSO Sessions</strong><p>It is possible to review the current collection of active SSO sessions,
and determine if CAS itself maintains an active SSO session via the <a href="../monitoring/Monitoring-Statistics.html">CAS administration panels.</a></p></div>

## Configuration

To see the relevant list of CAS properties, please [review this guide](../configuration/Configuration-Properties.html#ticket-granting-cookie).

The cookie has the following properties:

1. It is marked as secure.
2. Depending on container support, the cookie would be marked as http-only automatically.
3. The cookie value is encrypted and signed via secret keys that need to be generated upon deployment.

If keys are left undefined, on startup CAS will notice that no keys are defined and it will appropriately generate keys for you automatically. Your CAS logs will then show the following snippet:

```bash
WARN [...] - <Secret key for encryption is not defined. CAS will auto-generate the encryption key>
WARN [...] - <Generated encryption key ABC of size ... . The generated key MUST be added to CAS settings.>
WARN [...] - <Secret key for signing is not defined. CAS will auto-generate the signing key>
WARN [...] - <Generated signing key XYZ of size ... . The generated key MUST be added to CAS settings.>
```

You should then grab each generated key for encryption and signing, and put them inside your CAS properties for each setting.
If you wish you manually generate keys, you may [use the following tool](https://github.com/mitreid-connect/json-web-key-generator).

## Cookie Generation for Renewed Authentications

By default, forced authentication requests that challenge the user for credentials
either via the [`renew` request parameter](../protocol/CAS-Protocol.html)
or via [the service-specific setting](../services/Service-Management.html) of
the CAS service registry will always generate the ticket-granting cookie
nonetheless. What this means is, logging in to a non-SSO-participating application
via CAS nonetheless creates a valid CAS single sign-on session that will be honored on a
subsequent attempt to authenticate to a SSO-participating application.

Plausibly, a CAS adopter may want this behavior to be different, such that logging in to a non-SSO-participating application
via CAS either does not create a CAS SSO session and the SSO session it creates is not honored for authenticating subsequently
to an SSO-participating application. This might better match user expectations.

To see the relevant list of CAS properties, please [review this guide](../configuration/Configuration-Properties.html#global-sso-behavior).

# SSO Warning Session Cookie

A warning cookie set by CAS upon the establishment of the SSO session at the request of the user on the CAS login page.
The cookie is used later to warn and prompt the user before a service ticket is generated and access to the service application is granted.

To see the relevant list of CAS properties, please [review this guide](../configuration/Configuration-Properties.html#warning-cookie).