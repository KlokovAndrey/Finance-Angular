import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';


export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const { keycloakConfig } = environment;
      try {
        await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          bearerExcludedUrls: [
            'localhost:8090',
            'localhost:8090/main',
            'localhost:4200'
          ]
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}

