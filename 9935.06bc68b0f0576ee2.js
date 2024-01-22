"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[9935],{9935:n=>{n.exports="import {AsyncPipe} from '@angular/common';\nimport {ChangeDetectionStrategy, Component} from '@angular/core';\nimport {\n    AbstractControl,\n    FormControl,\n    ReactiveFormsModule,\n    ValidationErrors,\n    ValidatorFn,\n} from '@angular/forms';\nimport {MaskitoDirective} from '@maskito/angular';\nimport {TuiValidationError} from '@taiga-ui/cdk';\nimport {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core';\nimport {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';\nimport {CountryCode, isValidPhoneNumber} from 'libphonenumber-js/max';\n\nimport mask from './mask';\n\nfunction phoneValidator(countryCode: CountryCode): ValidatorFn {\n    return (control: AbstractControl): ValidationErrors | null => {\n        const valid = isValidPhoneNumber(control.value, countryCode);\n\n        return valid ? null : new TuiValidationError('Invalid number');\n    };\n}\n\n@Component({\n    standalone: true,\n    selector: 'phone-doc-example-2',\n    imports: [\n        TuiInputModule,\n        TuiTextfieldControllerModule,\n        ReactiveFormsModule,\n        MaskitoDirective,\n        TuiErrorModule,\n        AsyncPipe,\n        TuiFieldErrorPipeModule,\n    ],\n    template: `\n        <tui-input\n            tuiTextfieldCustomContent=\"tuiIconPhoneLarge\"\n            [formControl]=\"control\"\n            [style.max-width.rem]=\"30\"\n        >\n            Basic\n            <input\n                autocomplete=\"tel\"\n                inputmode=\"tel\"\n                tuiTextfield\n                [maskito]=\"mask\"\n            />\n        </tui-input>\n        <tui-error\n            [error]=\"[] | tuiFieldError | async\"\n            [formControl]=\"control\"\n        ></tui-error>\n    `,\n    changeDetection: ChangeDetectionStrategy.OnPush,\n})\nexport class PhoneMaskDocExample2 {\n    readonly control = new FormControl('+36 20 123-3122', phoneValidator('HU'));\n    readonly mask = mask;\n}\n"}}]);