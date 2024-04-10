import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'semantic-ui-react';

const SemanticUIForm = () => {
  const [formData, setFormData] = useState({
    selectOption: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const selectOptions = [
    { key: '1', text: 'Option 1', value: 'option1' },
    { key: '2', text: 'Option 2', value: 'option2' },
    { key: '3', text: 'Option 3', value: 'option3' },
  ];

  const handleChange = (e, { name, value }) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (e, { value }) => {
    setFormData(prevState => ({
      ...prevState,
      selectOption: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <Form >
      <Form.Group widths='equal'>
        <Form.Field
          control={Select}
          label='Select segment'
          options={selectOptions}
          placeholder='Select option'
          name='selectOption'
          value={formData.selectOption}
          onChange={handleSelectChange}
        />
      <Form.Button primary>Submit</Form.Button>
      </Form.Group>
      <Form.Field
        control={Input}
        label='Subject'
        placeholder='Enter Subject'
        type='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
      />
      <Form.Group widths='equal'>
        <Form.Field
          control={Select}
          label='Select Template'
          options={selectOptions}
          placeholder='Select option'
          name='selectOption'
          value={formData.selectOption}
          onChange={handleSelectChange}
        />
      <Form.Button primary>Create New Template</Form.Button>
      </Form.Group>
    </Form>
  );
};

export default SemanticUIForm;
