import React, {ReactElement} from 'react';
import {render, RenderResult, fireEvent} from '@testing-library/react';
import App from './App';


describe('<App />', () => {
  let subject: RenderResult

  beforeEach(() => {
    subject = render(<App />)
  });

  it('renders A characters', () => {
    const aaa = subject.getAllByText('A');
    expect(aaa.length).toBeGreaterThan(200);
  });

  it('starts with the first character highlighted', () => {
    const aaa = subject.getAllByText('A')
    expect(aaa[0]).toHaveClass("active")
    expect(aaa[1]).not.toHaveClass("active")
  });

  it('cycles character forward on down button click', () => {
    const char = subject.getAllByText('A')[0]
    expect(char.textContent).toEqual('A')
    fireEvent.click(subject.getByTitle('cycle forward'))
    expect(char.textContent).toEqual('B')
  })

  it('cycles character backward on up button click', () => {
    const char = subject.getAllByText('A')[0]
    fireEvent.click(subject.getByTitle('cycle forward'))
    expect(char.textContent).toEqual('B')
    fireEvent.click(subject.getByTitle('cycle backward'))
    expect(char.textContent).toEqual('A')
  })

  it('wraps character cycling', () => {
    const char = subject.getAllByText('A')[0]
    for (let i = 0; i < 30; i++) {
      fireEvent.click(subject.getByTitle('cycle forward'))
    }
    expect(char.textContent).toEqual('_')
    fireEvent.click(subject.getByTitle('cycle forward'))
    expect(char.textContent).toEqual('\u00a0')
    fireEvent.click(subject.getByTitle('cycle backward'))
    expect(char.textContent).toEqual('_')
  })

  it('moves highlight to next character on ok button click', () => {
    const aaa = subject.getAllByText('A')
    expect(aaa[0]).toHaveClass("active")
    expect(aaa[1]).not.toHaveClass("active")

    fireEvent.click(subject.getByTitle('next character'))
    expect(aaa[1]).toHaveClass("active")
    expect(aaa[0]).not.toHaveClass("active")
  })

  it('calls send tweet with the current tweet contents', () => {
    const tweetLink = subject.getByTitle('tweet it')
    fireEvent.click(subject.getByTitle('cycle forward'))
    fireEvent.click(subject.getByTitle('next character'))
    expect(tweetLink.getAttribute('href')).toContain('B')
    fireEvent.click(subject.getByTitle('next character'));
    expect(tweetLink.getAttribute('href')).toContain('BA');
  });
});

