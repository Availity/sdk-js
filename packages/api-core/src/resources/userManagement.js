import AvApi from '../api';

export default class AvUserManagement extends AvApi {
  constructor(config) {
    super({
      path: 'cloud/web/appl/user-management',
      version: '',
      ...config,
    });
  }

  usersConfig(id = '', extraConfig = {}) {
    const cfg = this.config({ ...extraConfig, name: 'legacy/sdk/platform/v1/users' });
    cfg.url = this.getUrl(cfg, id);
    return cfg;
  }

  me() {
    const cfg = this.usersConfig('me');
    cfg.method = 'GET';
    return this.request(cfg, this.afterGet);
  }

  getUser(akaName) {
    const cfg = this.usersConfig(akaName);
    cfg.method = 'GET';
    return this.request(cfg, this.afterGet);
  }

  getMe() {
    return this.me().then((response) => response?.data);
  }

  getUserId() {
    return this.getMe().then((user) => user?.id);
  }

  getAkaName() {
    return this.getMe().then((user) => user?.akaname);
  }

  getCurrentRegion() {
    return this.getMe().then((user) => user?.currentRegion);
  }
}
