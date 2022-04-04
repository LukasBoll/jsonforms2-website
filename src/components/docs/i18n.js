import React, { useMemo, useState } from 'react';
import get from 'lodash/get';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import Button from '@mui/material/Button';
import { JsonForms } from '@jsonforms/react';

const i18n = {
  schema: {
    properties: {
      firstName: {
        type: "string"
      },
      lastName: {
        type: "string"
      },
      email: {
        type: "string"
      },
      gender: {
        type: "string",
        enum: [
          "Male",
          "Female",
          "Other"
        ]
      }
    },
    required: [
      "email"
    ]
  },
  uischema: {
    type: "VerticalLayout",
    elements: [
      {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/firstName"
          },
          {
            type: "Control",
            scope: "#/properties/lastName"
          }
        ]
      },
      {
        type: "Control",
        scope: "#/properties/email"
      },
      {
        type: "Control",
        scope: "#/properties/gender"
      }
    ]
  }
}

export const en = {
  firstName: {
    label: 'First Name',
    description: 'The first name of the person',
  },
  lastName: {
    label: 'Last Name',
  },
  email: {
    label: 'Email'
  },
  gender: {
    label: 'Gender',
    Male: 'Male',
    Female: 'Female',
    Other: 'Diverse'
  },
  error: {
    required: 'This field is required',
  },
};
  
export const de = {
  firstName: {
    label: 'Vorname',
    description: 'Der Vorname der Person',
  },
  lastName: {
    label: 'Nachname',
  },
  email: {
    label: 'Email'
  },
  gender: {
    label: 'Geschlecht',
    Male: 'Männlich',
    Female: 'Weiblich',
    Other: 'Divers'
  },
  error: {
    required: 'Dieses Feld muss ausgefüllt werden.',
  },
};

const I18nExample = () => {
  const [locale, setLocale] = useState('de');

  const createTranslator = (locale) => (key, defaultMessage) => {
    return get(locale === 'en' ? en : de, key) ?? defaultMessage;
  };
  
  const translation = useMemo(() => createTranslator(locale), [locale]);

  const switchLocale = () => {
    if(locale === 'en') {
      setLocale('de');
    } else {
      setLocale('en');
    }
  };

  return (
    <div>
      <JsonForms
        schema={i18n.schema}
        uischema={i18n.uischema}
        i18n={{locale: locale, translate: translation}}
        renderers={materialRenderers}
        cells={materialCells}
      />
      <Button onClick={switchLocale} color='primary' variant='contained'>
        Switch language
      </Button>
      <br />
      Current language: {locale}
    </div>
  );
};

export default I18nExample;
