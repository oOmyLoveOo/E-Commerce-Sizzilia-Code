const Policies = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 text-gray-800">
      <section>
        <h2 className="text-2xl font-bold underline mb-4">Política de uso y devolución</h2>
        <p className="mb-4">
          En <strong>Sizzilia Code</strong> nos comprometemos a ofrecer prendas de calidad. Si no estás satisfecho con tu compra, podés solicitar un cambio o devolución dentro de los 14 días posteriores a la recepción del pedido.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Las prendas deben estar sin uso, con etiquetas y en su empaque original.</li>
          <li>El cliente es responsable del costo de envío para devoluciones, salvo error nuestro.</li>
          <li>No se aceptan devoluciones de productos en promoción.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold underline mb-4">Política de privacidad</h2>
        <p className="mb-4">
          Respetamos tu privacidad. La información que recopilamos (nombre, correo, dirección) se utiliza exclusivamente para procesar pedidos y mejorar tu experiencia como cliente.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>No compartimos tus datos con terceros sin tu consentimiento.</li>
          <li>Podés solicitar la eliminación de tus datos en cualquier momento.</li>
          <li>Tu información está protegida mediante medidas de seguridad adecuadas.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold underline mb-4">Método de pago y envío</h2>
        <p className="mb-4">
          Aceptamos pagos mediante tarjeta de crédito/débito y otros métodos seguros disponibles en el sitio.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>El envío se realiza dentro de las 48 horas hábiles luego de la confirmación del pago.</li>
          <li>Trabajamos con servicios de mensajería confiables para asegurar la entrega en tiempo y forma.</li>
          <li>Recibirás un número de seguimiento una vez enviado tu pedido.</li>
        </ul>
      </section>
    </div>
  );
};

export default Policies;
