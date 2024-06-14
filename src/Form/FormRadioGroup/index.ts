import { Component, triggerEvent } from '../../_util/simply';
import { resolveEventValue } from '../../_util/platform';
import { FormRadioGroupDefaultProps } from './props';
import { createForm } from '../form';

Component(
  FormRadioGroupDefaultProps,
  {
    onChange(value, e) {
      this.emit('onChange', resolveEventValue(value));
      triggerEvent(this, 'change', resolveEventValue(value), e);
    },
  },
  null,
  [createForm()]
);
