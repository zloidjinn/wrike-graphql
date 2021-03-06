import { schemaComposer } from 'graphql-compose';
import {
  CustomFieldInheritanceEnum,
  CurrencyEnum,
  CustomFieldAggregationEnum,
} from 'app/schema/types/Enums';
import { ContactID } from 'app/schema/types/Scalars';

export const CustomFieldSettingsInput = schemaComposer.createInputTC({
  name: 'CustomFieldSettingsInput',
  fields: {
    inheritanceType: {
      type: CustomFieldInheritanceEnum,
      defaultValue: 'All',
      description: 'Inheritance type.',
    },
    decimalPlaces: {
      type: 'Int',
      defaultValue: 2,
      description: 'Decimal places (only for Numeric, Percentage and Currency types).',
    },
    useThousandsSeparator: {
      type: 'Boolean',
      defaultValue: false,
      description: 'Use thousands separator (only for Numeric type).',
    },
    currency: {
      type: CurrencyEnum,
      defaultValue: 'USD',
      description: 'Currency (only for Currency type)',
    },
    aggregation: {
      type: CustomFieldAggregationEnum,
      description:
        'Aggregation type (only for Text, Numeric, Percentage, Currency, Duration, MultipleSelect and DropDown types)',
    },
    values: {
      type: '[String!]',
      description: 'Dropdown values (only for DropDown and MultipleSelect type)',
    },
    allowOtherValues: {
      type: 'Boolean',
      defaultValue: true,
      description: 'Allow users to input other values (only for DropDown type).',
    },
    contacts: {
      type: ContactID.NonNull.List,
      description: 'Allowed users or invitations (only for Users type)',
    },
  },
});
