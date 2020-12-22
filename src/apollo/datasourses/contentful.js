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

    const data = JSON.parse(await this.get(
      `spaces/${this.context.contentful_space_id}/entries`,
      { content_type: type },
      headers,
    ));

    data.items = data.items.map(item => {
      const id = item.fields.image.sys.id;
      item.fields.image = data.includes.Asset.find(asset => asset.sys.id === id).fields;
      return item;
    });

    return data;
  }

  async getEntry(type, slug) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const data = JSON.parse(await this.get(
      `spaces/${this.context.contentful_space_id}/entries`,
      {
        content_type: type,
        ['fields.slug']: slug 
      },
      headers,
    ));

    data.items = data.items.map(item => {
      const id = item.fields.image.sys.id;
      item.fields.image = data.includes.Asset.find(asset => asset.sys.id === id).fields;
      return item;
    });

    return data;
  }
}

export default ContentfulAPI;
