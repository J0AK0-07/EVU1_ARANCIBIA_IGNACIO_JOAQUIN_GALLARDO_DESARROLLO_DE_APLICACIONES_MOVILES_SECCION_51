import test from 'node:test';
import assert from 'node:assert/strict';
import { validateTaskInput, makeTask, insertTask, editTask, deleteTask, switchTaskStatus } from '../src/lib/taskLogic.ts';

const initial = makeTask({ title: ' Estudiar Ionic ', description: ' Repasar UI ' }, 'id-1', '2026-11-01T00:00:00.000Z');

test('valida obligatorios, espacios y longitudes', () => {
  assert.ok(validateTaskInput({ title: ' ', description: '' }).title);
  assert.ok(validateTaskInput({ title: 'A', description: ' ' }).description);
  assert.ok(validateTaskInput({ title: 'a'.repeat(81), description: 'ok' }).title);
  assert.ok(validateTaskInput({ title: 'ok', description: 'b'.repeat(241) }).description);
  assert.deepEqual(validateTaskInput({ title: 'Bien', description: 'Detalle' }), {});
});

test('agrega tarea con título y descripción normalizados', () => {
  assert.equal(initial.title, 'Estudiar Ionic');
  assert.equal(initial.description, 'Repasar UI');
  assert.equal(insertTask([], initial).length, 1);
  assert.equal(insertTask([initial], makeTask({ title: 'B', description: 'C' }, 'id-2', initial.createdAt))[0].id, 'id-2');
});

test('edita solamente la tarea seleccionada y conserva el identificador', () => {
  const second = makeTask({ title: 'Otra', description: 'Otra descripción' }, 'id-2', initial.createdAt);
  const result = editTask([initial, second], 'id-1', { title: 'Nuevo', description: 'Cambio' }, '2026-11-02T00:00:00.000Z');
  assert.equal(result[0].title, 'Nuevo');
  assert.equal(result[0].description, 'Cambio');
  assert.equal(result[0].id, 'id-1');
  assert.deepEqual(result[1], second);
});

test('elimina únicamente la tarea solicitada', () => {
  const second = makeTask({ title: 'Otra', description: 'Descripción' }, 'id-2', initial.createdAt);
  assert.deepEqual(deleteTask([initial, second], 'id-1'), [second]);
});

test('completa y desmarca sin modificar las otras tareas', () => {
  const finished = switchTaskStatus([initial], 'id-1', '2026-11-03T00:00:00.000Z');
  assert.equal(finished[0].completed, true);
  assert.equal(switchTaskStatus(finished, 'id-1', '2026-11-04T00:00:00.000Z')[0].completed, false);
});