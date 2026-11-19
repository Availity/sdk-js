import AvApi from '../api';

export default class AvUserManagementApi extends AvApi {
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

  /**
   * Get the currently authenticated user's profile.
   */
  async me() {
    const cfg = this.usersConfig('me');
    cfg.method = 'GET';
    return this.request(cfg, this.afterGet);
  }

  /**
   * Get a specific user by their akaName (username).
   * @param {string} akaName
   */
  async getUser(akaName) {
    const cfg = this.usersConfig(akaName);
    cfg.method = 'GET';
    return this.request(cfg, this.afterGet);
  }

  /**
   * Get the current user's profile data (unwrapped from response).
   */
  async getMe() {
    const response = await this.me();
    return response?.data;
  }

  /**
   * Get the current user's ID.
   */
  async getUserId() {
    const user = await this.getMe();
    return user?.id;
  }

  /**
   * Get the current user's akaName.
   */
  async getAkaName() {
    const user = await this.getMe();
    return user?.akaname;
  }

  /**
   * Get the current user's active region code.
   */
  async getCurrentRegion() {
    const user = await this.getMe();
    return user?.currentRegion;
  }
}

export const avUserManagementApi = new AvUserManagementApi();
