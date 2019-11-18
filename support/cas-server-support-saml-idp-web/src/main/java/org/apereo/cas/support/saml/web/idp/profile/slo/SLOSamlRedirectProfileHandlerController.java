package org.apereo.cas.support.saml.web.idp.profile.slo;

import org.apereo.cas.support.saml.SamlIdPConstants;
import org.apereo.cas.support.saml.web.idp.profile.SamlProfileHandlerConfigurationContext;

import lombok.val;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * This is {@link SLOSamlRedirectProfileHandlerController}, responsible for
 * handling requests for SAML2 SLO Redirects.
 *
 * @author Misagh Moayyed
 * @since 5.1.0
 */
public class SLOSamlRedirectProfileHandlerController extends AbstractSamlSLOProfileHandlerController {
    public SLOSamlRedirectProfileHandlerController(final SamlProfileHandlerConfigurationContext samlProfileHandlerConfigurationContext) {
        super(samlProfileHandlerConfigurationContext);
    }

    /**
     * Handle SLO Redirect profile request.
     *
     * @param response the response
     * @param request  the request
     * @throws Exception the exception
     */
    @GetMapping(path = SamlIdPConstants.ENDPOINT_SAML2_SLO_PROFILE_REDIRECT)
    protected void handleSaml2ProfileSLOPostRequest(final HttpServletResponse response,
                                                    final HttpServletRequest request) throws Exception {
        val decoder = getSamlProfileHandlerConfigurationContext().getSamlMessageDecoders().getInstance(HttpMethod.GET);
        handleSloProfileRequest(response, request, decoder);
    }
}