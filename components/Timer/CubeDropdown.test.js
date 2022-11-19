import { it } from 'node:test';
import renderer from 'react-test-renderer';
import { isExportDeclaration } from 'typescript';
import CubeDropdown from './CubeDropdown';

it('allows the user to change the cube size', () => {
  const component = renderer.create(
    <CubeDropdown dispatch={dispatch} />
  );

  const dropdown = component.toJSON();
  expect(tree).toMatchSnapshot();

});