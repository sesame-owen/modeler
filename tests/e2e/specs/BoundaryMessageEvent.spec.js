import {
  addNodeTypeToPaper,
  getElementAtPosition,
  removeIndentationAndLinebreaks,
  setBoundaryEvent,
} from '../support/utils';
import { nodeTypes } from '../support/constants';

describe('Boundary Message Event', () => {
  const taskPosition = { x: 200, y: 200 };
  beforeEach(() => {
    addNodeTypeToPaper(taskPosition, nodeTypes.task, 'switch-to-sub-process');
  });

  it('Render an interrupting boundary message event', function() {
    setBoundaryEvent(nodeTypes.boundaryMessageEvent, taskPosition, nodeTypes.subProcess);

    const boundaryMessageEventXML = '<bpmn:boundaryEvent id="node_4" name="New Boundary Message Event" attachedToRef="node_3"><bpmn:messageEventDefinition /></bpmn:boundaryEvent>';

    cy.get('[data-test=downloadXMLBtn]').click();
    cy.window()
      .its('xml')
      .then(removeIndentationAndLinebreaks)
      .then(xml => {
        expect(xml).to.contain(boundaryMessageEventXML);
      });
  });

  it('Render a non-interrupting boundary message event', function() {
    setBoundaryEvent(nodeTypes.boundaryMessageEvent, taskPosition, nodeTypes.subProcess);
    getElementAtPosition(taskPosition).click();

    const interrupting = '[name=cancelActivity]';
    cy.get(interrupting).click();
    const boundaryMessageEventXML = '<bpmn:boundaryEvent id="node_4" name="New Boundary Message Event" cancelActivity="false" attachedToRef="node_3"><bpmn:messageEventDefinition /></bpmn:boundaryEvent>';

    cy.get('[data-test=downloadXMLBtn]').click();
    cy.window()
      .its('xml')
      .then(removeIndentationAndLinebreaks)
      .then(xml => {
        expect(xml).to.contain(boundaryMessageEventXML);
      });
  });
});
