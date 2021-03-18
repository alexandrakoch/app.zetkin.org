import { mountWithProviders } from '../utils/testing';
import RegistrationForm from './RegistrationForm';

describe('Registration Form', () => {

    it('contains a form and input is submitted onClick', () => {
        const spyOnSubmit = cy.spy();

        const dummyInput = {
            email: 'user@domain.se',
            first_name: 'Firstname',
            last_name: 'Lastname',
            password: 'abc123',
            phone: '123123123',
        };

        mountWithProviders(<RegistrationForm onValidSubmit={ spyOnSubmit } />);

        cy.get('[data-test="first-name"]').type(dummyInput.first_name);
        cy.get('[data-test="last-name"]').type(dummyInput.last_name);
        cy.get('[data-test="email-address"]').type(dummyInput.email);
        cy.get('[data-test="phone-number"]').type(dummyInput.phone);
        cy.get('[data-test="password"]').type(dummyInput.password);
        cy.get('[data-test="submit-button"]').click().then(() => {
            expect(spyOnSubmit).to.be.calledOnce;
            expect(spyOnSubmit).to.be.calledWith(dummyInput);
        });
    });
});