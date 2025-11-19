class AppConfig {
  static instance = null;

  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.useMock = config.useMock || false;
    this.connectTimeout = config.connectTimeout || 30000;
  }

  static get I() {
    if (!AppConfig.instance) {
      // Configuración por defecto - producción
      AppConfig.instance = new AppConfig({
        baseUrl: 'https://softwaredlv.duckdns.org',
        useMock: false,
        connectTimeout: 30000,
      });
    }
    return AppConfig.instance;
  }

  static set I(config) {
    AppConfig.instance = new AppConfig(config);
  }
}

export default AppConfig;
