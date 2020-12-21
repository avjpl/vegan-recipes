import { RESTDataSource } from 'apollo-datasource-rest';

class ContentfulAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://cdn.contentful.com/';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.contentful_access_token}`);
  }

  async getEntries(type) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const data = await this.get(
      `spaces/${this.context.contentful_space_id}/entries`,
      { content_type: type },
      headers,
    );

    return JSON.parse(data);
  }
}

export default ContentfulAPI;
