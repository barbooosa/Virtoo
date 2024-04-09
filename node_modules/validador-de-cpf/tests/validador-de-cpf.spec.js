const verificarCPF = require("../bin/validador-de-cpf");

test("O CPF 000.000.000-00 deve ser inválido", () => {
  expect(verificarCPF("000.000.000-00")).toBe(false);
});
test("O CPF 333.333.333-33 deve ser inválido", () => {
  expect(verificarCPF("333.333.333-33")).toBe(false);
});
test("O CPF 999.999.999-99 deve ser inválido", () => {
  expect(verificarCPF("999.999.999-99")).toBe(false);
});

test("O CPF 001.999.889999-99 deve ser inválido", () => {
  expect(verificarCPF("001.999.889999-99")).toBe(false);
});

test("O CPF 386.995.390-02 deve ser válido", () => {
  expect(verificarCPF("386.995.390-02")).toBe(true);
});
test("O CPF 773.857.990-00 deve ser válido", () => {
  expect(verificarCPF("773.857.990-00")).toBe(true);
});
test("O CPF 124.591.790-06 deve ser válido", () => {
  expect(verificarCPF("124.591.790-06")).toBe(true);
});
test("O CPF 049.339.270-06 deve ser válido", () => {
  expect(verificarCPF("049.339.270-06")).toBe(true);
});
test("O CPF 568.466.830-54 deve ser válido", () => {
  expect(verificarCPF("568.466.830-54")).toBe(true);
});
