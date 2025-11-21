import type { Schema, Struct } from '@strapi/strapi';

export interface SharedUrl extends Struct.ComponentSchema {
  collectionName: 'components_shared_urls';
  info: {
    displayName: 'url';
    icon: 'arrowRight';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.url': SharedUrl;
    }
  }
}
