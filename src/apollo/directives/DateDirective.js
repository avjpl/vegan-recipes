import { SchemaDirectiveVisitor } from 'apollo-server-micro';
import { defaultFieldResolver, GraphQLString } from 'graphql';
import moment from 'moment';

class DateCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultFormat } = this.args;

    field.args.push({
      name: 'format',
      type: GraphQLString
    });

    field.resolve = async function (
      source,
      { format, ...otherArgs },
      context,
      info,
    ) {
      const date = await resolve.call(this, source, otherArgs, context, info);

      if (date) {
        return moment(date).format(format || defaultFormat);
      }

      return date;
    };

    field.type = GraphQLString;
  }
}

export default DateCaseDirective;
