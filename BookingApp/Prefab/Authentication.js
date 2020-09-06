import React, { useState, useCallback, useMemo } from 'react';
import { UIManager, LayoutAnimation, Alert,Text,Button } from 'react-native';
import { authorize, refresh, revoke, prefetchConfiguration } from 'react-native-app-auth';

// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);

this.state = {
  hasLoggedInOnce: false,
  provider: "",
  accessToken: "",
  accessTokenExpirationDate: "",
  refreshToken: ""
};

const configs = {
  identityserver: {
    issuer: 'https://demo.identityserver.io',
    clientId: 'interactive.public',
    redirectUrl: 'io.identityserver.demo:/oauthredirect',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'offline_access'],

    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
    //   tokenEndpoint: 'https://demo.identityserver.io/connect/token',
    //   revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
    // }
  },
  auth0: {
    // From https://openidconnect.net/
    issuer: 'https://samples.auth0.com',
    clientId: 'kbyuFDidLLm280LIwVFiazOqjO3ty8KH',
    redirectUrl: 'https://openidconnect.net/callback',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'phone', 'address'],

    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://samples.auth0.com/authorize',
    //   tokenEndpoint: 'https://samples.auth0.com/oauth/token',
    //   revocationEndpoint: 'https://samples.auth0.com/oauth/revoke'
    // }
  }
};

const defaultAuthState = {
  hasLoggedInOnce: false,
  provider: '',
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: ''
};

export default function Authentication () {
  const [authState, setAuthState] = useState(defaultAuthState);
  React.useEffect(() => {
    prefetchConfiguration({
      warmAndPrefetchChrome: true,
      ...configs.identityserver
    });
  }, []);

  const handleAuthorize = useCallback(
    async provider => {
      try {
        const config = configs[provider];
        const newAuthState = await authorize(config);

        setAuthState({
          hasLoggedInOnce: true,
          provider: provider,
          ...newAuthState
        });
      } catch (error) {
        Alert.alert('Failed to log in', error.message);
      }
    },
    [authState]
  );

  const handleRefresh = useCallback(async () => {
    try {
      const config = configs[authState.provider];
      const newAuthState = await refresh(config, {
        refreshToken: authState.refreshToken
      });

      setAuthState(current => ({
        ...current,
        ...newAuthState,
        refreshToken: newAuthState.refreshToken || current.refreshToken
      }))

    } catch (error) {
      Alert.alert('Failed to refresh token', error.message);
    }
  }, [authState]);

  const handleRevoke = useCallback(async () => {
    try {
      const config = configs[authState.provider];
      await revoke(config, {
        tokenToRevoke: authState.accessToken,
        sendClientId: true
      });

      setAuthState({
        provider: '',
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: ''
      });
    } catch (error) {
      Alert.alert('Failed to revoke token', error.message);
    }
  }, [authState]);

  const showRevoke = useMemo(() => {
    if (authState.accessToken) {
      const config = configs[authState.provider];
      if (config.issuer || config.serviceConfiguration.revocationEndpoint) {
        return true;
      }
    }
    return false;
  }, [authState]);

  return (

    <>
    {/* {!authState.accessToken?()} */}
    </>

    // <>
    //   {!!authState.accessToken ? (
    //     <>
    //       <Text>accessToken</Text>
    //       <Text>{authState.accessToken}</Text>
    //       <Text>accessTokenExpirationDate</Text>
    //       <Text>{authState.accessTokenExpirationDate}</Text>
    //       <Text>refreshToken</Text>
    //       <Text>{authState.refreshToken}</Text>
    //       <Text>scopes</Text>
    //       <Text>{authState.scopes.join(', ')}</Text>
    //     </>
    //   ) : (
    //     <Text>{authState.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}</Text>
    //   )}

    //   <>
    //     {!authState.accessToken ? (
    //       <>
    //         <Button
    //           onPress={() => handleAuthorize('identityserver')}
    //           title="Authorize IdentityServer"
    //           color="#DA2536"
    //         />
    //         <Button
    //           onPress={() => handleAuthorize('auth0')}
    //           title="Authorize Auth0"
    //           color="#DA2536"
    //         />
    //       </>
    //     ) : null}
    //     {!!authState.refreshToken ? (
    //       <Button onPress={handleRefresh} title="Refresh" color="#24C2CB" />
    //     ) : null}
    //     {showRevoke ? (
    //       <Button onPress={handleRevoke} title="Revoke" color="#EF525B" />
    //     ) : null}
    //   </>
    // </>
  );
}
