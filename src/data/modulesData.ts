import { ModuleItem, SecurityQuizCase, GlossaryTerm, EmailMessage } from '../types';

export const MODULES: ModuleItem[] = [
  {
    id: 'componentes-y-sistema',
    number: 1,
    title: '¿Qué es una Computadora y qué es Windows?',
    shortDescription: 'Conoce las partes del equipo (pantalla, teclado, ratón, torre) y qué es un sistema operativo sin tecnicismos.',
    iconName: 'Laptop',
    badge: 'Conceptos Clave',
    estimatedMinutes: 8,
    steps: [
      {
        id: 1,
        title: 'Las partes físicas de tu computadora (Hardware)',
        subtitle: 'Todo lo que puedes ver y tocar con las manos.',
        explanation: 'Una computadora se compone de elementos muy sencillos:\n\n1. 🖥️ **La Pantalla o Monitor**: Es donde ves las fotos, cartas y vídeos (como tu televisor).\n2. 🖱️ **El Ratón (Mouse) y el Teclado**: Son tus manos y tu voz para decirle a la computadora qué hacer.\n3. 🧠 **La Torre o Caja (El cerebro)**: Adentro está el procesador (que piensa) y el disco duro (el armario donde se guardan tus archivos).\n4. 📶 **El Módem o WiFi**: La cajita de luces que trae el Internet a tu casa por el aire.',
        audioText: 'Una computadora tiene partes físicas que puedes tocar: la pantalla para ver, el ratón y teclado para interactuar, el procesador para pensar, el disco duro para guardar y el wifi para conectar a internet.',
        instructionPrompt: 'Toca cada una de las partes de la computadora para descubrir cómo trabajan juntas.',
        reassuranceNote: 'No necesitas memorizar nombres técnicos; piensa en la computadora como un televisor inteligente con máquina de escribir.',
        componentKey: 'computer-hardware-anatomy'
      },
      {
        id: 2,
        title: '¿Qué es un Sistema Operativo y qué es Windows?',
        subtitle: 'El director de orquesta que hace que todo funcione.',
        explanation: 'Si la computadora fuera un coche, el **Sistema Operativo** sería el motor y el volante. Es el programa principal que enciende la pantalla, pone los botones y te permite abrir fotos o escribir.\n\nEl sistema operativo más famoso y usado del mundo se llama **Windows** (creado por Microsoft). Hay otros como **Android** (en los teléfonos) o **macOS/iOS** (en los equipos de Apple).',
        audioText: 'El sistema operativo es el director de orquesta de la computadora. Windows es el sistema operativo más utilizado del mundo y es el que te permite abrir tus fotos, programas y navegar.',
        instructionPrompt: 'Descubre qué hace Windows por ti cuando enciendes la máquina.',
        reassuranceNote: 'Windows se llama así porque organiza todo en "ventanas" rectangulares en la pantalla.',
        componentKey: 'os-explanation-visual'
      },
      {
        id: 3,
        title: 'El Gran Aclarador de Dudas: Mitos vs Realidad',
        subtitle: 'Aclaremos las confusiones más comunes de forma divertida.',
        explanation: 'Muchas personas se confunden con términos parecidos o creen mitos que no son ciertos. Vamos a dejar las cosas 100% claras:\n\n• ❌ **Mito:** "Google es Internet." 👉 **Realidad:** Internet es la red mundial. Google es solo una página para buscar dentro de esa red.\n• ❌ **Mito:** "Si cierro una ventana se borró mi foto." 👉 **Realidad:** Solo cerraste la vista; la foto sigue guardada en tu disco duro.\n• ❌ **Mito:** "La memoria RAM y el Disco Duro son lo mismo." 👉 **Realidad:** El Disco Duro es tu armario gigante; la RAM es tu mesa de trabajo rápida.',
        audioText: 'Aclaremos confusiones comunes: Internet es la red del mundo, el navegador es tu coche para viajar, y Google es solo una biblioteca de búsqueda.',
        instructionPrompt: 'Haz clic en las tarjetas de mitos para revelar la verdad y despejar todas tus dudas.',
        reassuranceNote: 'Es totalmente normal confundirse al principio. ¡Ahora lo sabrás mejor que nadie!',
        componentKey: 'myths-vs-reality-quiz'
      }
    ]
  },
  {
    id: 'primeros-pasos',
    number: 2,
    title: 'El Ratón y el Escritorio de Windows',
    shortDescription: 'Pierde el miedo: aprende qué es el ratón, cómo hacer clic, doble clic y cómo funciona el escritorio.',
    iconName: 'MousePointerClick',
    badge: 'Fundamental',
    estimatedMinutes: 8,
    steps: [
      {
        id: 1,
        title: 'La computadora es tu amiga: No puedes romper nada',
        subtitle: 'Una introducción con total tranquilidad y calma.',
        explanation: 'Lo primero y más importante que debes saber: ¡No puedes romper la computadora por hacer clic o explorar! Todo en Windows se puede cerrar con la X roja, deshacer o corregir. Este espacio es tu taller seguro para aprender a tu propio ritmo.',
        audioText: 'Bienvenido. Lo primero y más importante que debes saber es que no puedes romper la computadora por hacer clic o explorar. Todo se puede cerrar o corregir. Tómate todo el tiempo que necesites.',
        instructionPrompt: 'Lee con calma y pulsa el botón para encender la pantalla de Windows.',
        reassuranceNote: 'Consejo de oro: Nadie nace sabiendo. Cada clic que das es un paso adelante.',
        componentKey: 'intro-peace-of-mind'
      },
      {
        id: 2,
        title: 'El Ratón (Mouse): El botón izquierdo',
        subtitle: 'Aprende a apuntar y presionar con suavidad.',
        explanation: 'El ratón tiene dos botones principales. El botón izquierdo (el que queda bajo tu dedo índice) es el más importante: sirve para elegir cosas, tocar botones y abrir lecciones. Solo necesitas presionarlo suavemente una sola vez: ¡Clic!',
        audioText: 'El botón izquierdo del ratón sirve para elegir cosas y presionar botones. Intenta tocar los tres botones de colores que ves en pantalla para practicar tu puntería.',
        instructionPrompt: 'Haz un solo clic izquierdo sobre cada uno de los 3 botones de colores para practicar.',
        reassuranceNote: 'No hace falta apretar fuerte, basta con una suave pulsación.',
        componentKey: 'mouse-single-click-practice'
      },
      {
        id: 3,
        title: 'El Doble Clic: Dos toques rápidos',
        subtitle: 'La llave para abrir carpetas y programas en el escritorio.',
        explanation: 'A veces Windows te pedirá hacer "doble clic". Esto significa pulsar el botón izquierdo dos veces seguidas y rápidas: "clic-clic", como cuando tocas dos veces una puerta con los nudillos ("toc-toc").',
        audioText: 'El doble clic consiste en presionar el botón izquierdo dos veces seguidas rápidamente, como hacer toc toc en una puerta. Prueba a abrir la carpeta que aparece en la pantalla haciendo doble clic.',
        instructionPrompt: 'Haz doble clic sobre la carpeta amarilla para abrirla y descubrir lo que hay dentro.',
        reassuranceNote: 'Si no se abre al principio, no te preocupes: intenta hacer los dos clics un poquito más rápido.',
        componentKey: 'mouse-double-click-practice'
      },
      {
        id: 4,
        title: 'El Escritorio y la Barra de Tareas de Windows',
        subtitle: 'Conoce la mesa de trabajo de tu computadora.',
        explanation: 'La pantalla principal se llama "Escritorio", igual que tu mesa de trabajo en casa. En la parte inferior está la Barra de Tareas con el Botón Inicio, la hora y los programas.',
        audioText: 'El escritorio es como tu mesa de trabajo. Pasa el ratón por encima de los elementos para ver cómo el cursor cambia de forma y te ayuda a interactuar.',
        instructionPrompt: 'Mueve el ratón sobre los objetos del escritorio simulado para aprender para qué sirve cada uno.',
        reassuranceNote: 'La flechita blanca es la extensión de tu dedo índice en la pantalla.',
        componentKey: 'desktop-anatomy-practice'
      }
    ]
  },
  {
    id: 'buscar-programas',
    number: 3,
    title: 'Buscar y Abrir Aplicaciones en Windows',
    shortDescription: 'Aprende a usar la barra de búsqueda de Windows, el Menú Inicio y a encontrar tus fotos y archivos.',
    iconName: 'Search',
    badge: 'Muy Útil',
    estimatedMinutes: 10,
    steps: [
      {
        id: 1,
        title: 'El Menú Inicio y la Lupa de Búsqueda',
        subtitle: 'Las 3 formas de encontrar cualquier programa en Windows.',
        explanation: 'En Windows puedes abrir cualquier aplicación de tres formas muy fáciles:\n\n1. 🔍 **Por la Lupa de Búsqueda**: Escribes el nombre (ej. "Calculadora", "Paint", "Word") y aparece de inmediato.\n2. 🪟 **Por el Menú Inicio**: Haciendo clic en el botón de cuatro cuadros azules para ver la lista de programas ordenados de la A a la Z.\n3. 📌 **Por la Barra de Tareas**: Clic directo en los iconos anclados abajo.',
        audioText: 'En Windows puedes abrir programas escribiendo en la lupa de búsqueda, abriendo el menú inicio o tocando los iconos de la barra de tareas.',
        instructionPrompt: 'Observa cómo buscar aplicaciones en Windows y prepárate para practicar.',
        reassuranceNote: 'No hace falta que memorices menús complicados, la lupa hace todo el trabajo.',
        componentKey: 'search-intro'
      },
      {
        id: 2,
        title: 'Simulador: Buscar y abrir Calculadora y Bloc de Notas',
        subtitle: 'Escribe el nombre de lo que necesitas y ábrelo con un clic.',
        explanation: 'Vamos a practicar: haz clic en la barra de búsqueda de Windows, escribe la palabra "Calculadora" (o "Notas") y pulsa sobre el resultado para abrir la aplicación real.',
        audioText: 'Haz clic en la barra de búsqueda, escribe la palabra calculadora y pulsa sobre el resultado para abrir la calculadora interactiva.',
        instructionPrompt: 'Escribe "Calculadora" en la barra de búsqueda y haz clic en el programa para probarlo.',
        reassuranceNote: 'Si te equivocas de letra, la tecla de borrar (←) borra hacia atrás fácilmente.',
        componentKey: 'search-program-simulator'
      },
      {
        id: 3,
        title: 'El Explorador de Archivos de Windows',
        subtitle: 'Dónde se guardan tus fotos, cartas y descargas.',
        explanation: 'El Explorador de Archivos organiza tus cosas en cajones ordenados: "Documentos" (cartas y notas), "Imágenes" (fotos de la familia) y "Descargas" (lo que bajas de Internet).',
        audioText: 'El explorador de archivos organiza tus cosas en cajones digitales: Documentos para textos, Imágenes para fotos familiares y Descargas para lo que guardas de internet.',
        instructionPrompt: 'Explora las tres carpetas principales haciendo clic en cada una de ellas.',
        reassuranceNote: 'Tus archivos no se borran solos, siempre están guardados en estas carpetas.',
        componentKey: 'file-explorer-simulator'
      },
      {
        id: 4,
        title: 'Práctica: Localizar una receta importante',
        subtitle: 'Encuentra un documento guardado paso a paso.',
        explanation: 'Imagina que guardaste la "Receta Familiar de Paella" en tu carpeta de Documentos. Vamos a abrir la carpeta de Documentos y hacer clic sobre el archivo para leerlo en el Bloc de Notas.',
        audioText: 'Abre la carpeta Documentos y busca el archivo llamado Receta Familiar de Paella para abrirlo en el bloc de notas.',
        instructionPrompt: 'Haz clic en la carpeta "Documentos" y luego abre el archivo "Receta Familiar de Paella".',
        reassuranceNote: '¡Excelente! Así es exactamente como abrirás tus cartas y recetas en la vida real.',
        componentKey: 'find-document-challenge'
      }
    ]
  },
  {
    id: 'navegar-internet',
    number: 4,
    title: 'Navegar por Internet: Edge, Chrome y Buscadores',
    shortDescription: 'Descubre qué es un navegador, conoce Microsoft Edge y Google Chrome, y aprende a buscar en Google.',
    iconName: 'Globe',
    badge: 'Imprescindible',
    estimatedMinutes: 12,
    steps: [
      {
        id: 1,
        title: '¿Qué es un Navegador? (Edge vs Chrome vs Google)',
        subtitle: 'Aclarando la mayor confusión de Internet.',
        explanation: 'Mucha gente confunde el **Navegador** con **Google**. Aquí está la diferencia exacta:\n\n• 🚗 **El Navegador (Microsoft Edge, Google Chrome, Firefox)**: Es el coche o vehículo que usas para viajar por las carreteras de Internet.\n• 📚 **Google**: Es una biblioteca o buscador dentro de ese viaje.\n• 🌐 **Internet**: Es la red de carreteras de todo el mundo.\n\nEn Windows ya viene instalado **Microsoft Edge** (la ola azul), pero también puedes usar **Google Chrome** (el círculo de 4 colores). ¡Ambos hacen exactamente lo mismo!',
        audioText: 'El navegador web es el coche con el que viajas por internet. Microsoft Edge y Google Chrome son dos marcas de coches que hacen lo mismo. Google es un buscador dentro de internet.',
        instructionPrompt: 'Observa la comparativa entre Microsoft Edge y Google Chrome y pruébalos.',
        reassuranceNote: 'Puedes usar Edge o Chrome indistintamente; tus páginas favoritas se verán igual de bien en ambos.',
        componentKey: 'browser-types-comparison'
      },
      {
        id: 2,
        title: 'Simulador de Microsoft Edge y Google Chrome',
        subtitle: 'Aprende los botones clave: Atrás, Adelante y Recargar.',
        explanation: 'En la parte superior del navegador hay una barra blanca: la Barra de Direcciones. A la izquierda tienes la flecha "Atrás" (⬅️) que es tu salvavidas: si entras a una página que no te gusta o te equivocaste, pulsas la flecha Atrás y regresas inmediatamente al lugar anterior.',
        audioText: 'La flecha hacia la izquierda sirve para volver atrás si te equivocas de página. Es tu botón salvavidas para no perderte.',
        instructionPrompt: 'Prueba a cambiar entre la vista de Microsoft Edge y Google Chrome y usa el botón Atrás (⬅️).',
        reassuranceNote: 'La flecha "Atrás" siempre te devolverá a terreno seguro.',
        componentKey: 'browser-navigation-practice'
      },
      {
        id: 3,
        title: 'Las Pestañas (Tabs): Varias páginas a la vez',
        subtitle: 'Como tener varias páginas abiertas en un mismo cuaderno.',
        explanation: 'En la parte superior del navegador verás pestañas rectangulares. Te permiten tener abiertas varias páginas (el periódico en una, el tiempo en otra). Con el botón (+) abres una nueva y con la (x) cierras la que ya leíste.',
        audioText: 'Las pestañas te permiten tener abiertas varias páginas al mismo tiempo. Puedes cambiar de una a otra haciendo clic en su nombre, o abrir una nueva con el signo de más.',
        instructionPrompt: 'Haz clic en las pestañas para cambiar de página y prueba a abrir una nueva pestaña con el botón (+).',
        reassuranceNote: 'Cerrar una pestaña no borra nada de tu computadora, solo cierra esa página web.',
        componentKey: 'browser-tabs-practice'
      },
      {
        id: 4,
        title: 'Buscar en Google y evitar anuncios engañosos',
        subtitle: 'Encuentra información útil distinguiendo resultados reales.',
        explanation: 'Cuando buscas algo en Google, aprenderemos a mirar los resultados informativos limpios y a no hacer clic en anuncios comerciales que dicen "Patrocinado" o intentan venderte cosas.',
        audioText: 'Cuando busques en Google, fíjate en los resultados limpios y evita hacer clic en anuncios que dicen patrocinado.',
        instructionPrompt: 'Realiza una búsqueda simulada y haz clic en el resultado oficial correcto.',
        reassuranceNote: 'Buscar información es fácil: solo escribe lo que necesitas con palabras sencillas.',
        componentKey: 'google-search-simulator'
      }
    ]
  },
  {
    id: 'correo-electronico',
    number: 5,
    title: 'El Correo Electrónico: Outlook y Gmail',
    shortDescription: 'Aprende a usar tanto Gmail como Outlook/Hotmail para leer, responder y enviar correos a tu familia.',
    iconName: 'Mail',
    badge: 'Comunicación',
    estimatedMinutes: 12,
    steps: [
      {
        id: 1,
        title: '¿Qué es el Correo y cuáles son los dos principales?',
        subtitle: 'Conoce Gmail (Google) y Outlook (Microsoft).',
        explanation: 'El correo electrónico es tu buzón de cartas digital. Existen dos proveedores principales en el mundo:\n\n1. 🔴 **Gmail (de Google)**: Tu correo termina en `@gmail.com`.\n2. 🔵 **Outlook / Hotmail (de Microsoft)**: Tu correo termina en `@outlook.com` o `@hotmail.com`.\n\nAmbos funcionan igual: tienes una Bandeja de Entrada para recibir, un botón para Responder y un botón para Enviar.',
        audioText: 'El correo electrónico funciona igual en Gmail de Google y en Outlook de Microsoft. Ambos tienen bandeja de entrada, botón de responder y botón de enviar.',
        instructionPrompt: 'Observa la comparativa entre Gmail y Outlook y entra al simulador.',
        reassuranceNote: 'No importa si tu familia usa Gmail o Outlook; puedes escribirles sin ningún problema desde cualquiera de los dos.',
        componentKey: 'email-intro'
      },
      {
        id: 2,
        title: 'Simulador de Bandeja de Entrada (Outlook & Gmail)',
        subtitle: 'Prueba la interfaz de Outlook y de Gmail con un solo clic.',
        explanation: 'En este simulador puedes cambiar entre la apariencia de **Microsoft Outlook** y la de **Gmail de Google**. Abre el correo que te envió tu hijo con las fotos familiares del almuerzo.',
        audioText: 'Esta es tu bandeja de entrada simulada. Puedes alternar entre la vista de Outlook y la de Gmail. Haz clic sobre el correo de tu hijo para abrirlo.',
        instructionPrompt: 'Haz clic en el correo de "Tu Familia (Carlos)" para abrirlo y leer el mensaje.',
        reassuranceNote: 'Abrir un correo de una persona conocida es completamente seguro.',
        componentKey: 'email-inbox-simulator'
      },
      {
        id: 3,
        title: 'Responder y Enviar el Correo',
        subtitle: 'Escribe tu respuesta con tranquilidad y envíala con un clic.',
        explanation: 'Pulsa el botón "Responder", escribe tu mensaje cariñoso (o toca una de las frases rápidas sugeridas) y luego haz clic en "Enviar Correo" (✉️).',
        audioText: 'Pulsa el botón Responder, escribe un mensaje de agradecimiento o pulsa las frases sugeridas, y luego haz clic en Enviar.',
        instructionPrompt: 'Haz clic en "Responder", redacta tu mensaje y pulsa "Enviar Correo".',
        reassuranceNote: 'Puedes revisar lo que escribes todo el tiempo antes de pulsar Enviar.',
        componentKey: 'email-reply-simulator'
      }
    ]
  },
  {
    id: 'seguridad-digital',
    number: 6,
    title: 'Seguridad Digital y Windows Defender',
    shortDescription: 'Aprende a detectar engaños, correos falsos y a cerrar avisos sospechosos con total calma.',
    iconName: 'ShieldCheck',
    badge: 'Muy Importante',
    estimatedMinutes: 12,
    steps: [
      {
        id: 1,
        title: 'Las 3 Reglas de Oro de la Seguridad',
        subtitle: 'Con estos tres consejos nadie podrá engañarte jamás.',
        explanation: 'Internet es un lugar maravilloso si conoces tres verdades simples:\n\n1. 🚨 **Si hay prisa o alarma, desconfía**: Los estafadores intentan asustar diciendo "¡Tu cuenta se cerrará en 1 hora!".\n2. 🎁 **Nadie regala dinero ni teléfonos**: Si dice que ganaste un premio de un sorteo en el que no participaste, es mentira.\n3. 🏦 **Tu banco NUNCA te pedirá tus contraseñas por correo ni por mensaje**.',
        audioText: 'Recuerda las tres reglas de oro: desconfía de los mensajes con prisa o miedo, nadie regala premios misteriosos, y tu banco nunca te pedirá contraseñas por correo.',
        instructionPrompt: 'Lee las 3 reglas de oro. En el siguiente paso jugaremos a detectar engaños como un detective.',
        reassuranceNote: 'Si alguna vez tienes una duda, no hagas clic: simplemente llama a tu hijo o a alguien de confianza.',
        componentKey: 'security-golden-rules'
      },
      {
        id: 2,
        title: 'Juego del Inspector: ¿Es Seguro o es un Engaño?',
        subtitle: 'Pon a prueba tu ojo de detective con casos reales.',
        explanation: 'Te mostraremos diferentes mensajes. Tu misión es usar la "Lupa de Detective" para mirar quién lo envía de verdad y decidir si es seguro o si es un intento de engaño (Phishing).',
        audioText: 'Usa tu ojo de detective. Revisa el remitente y decide si el mensaje es seguro o si es una trampa. Tómate todo el tiempo que necesites.',
        instructionPrompt: 'Analiza cada uno de los 4 casos y pulsa "Es Seguro" o "Es un Engaño".',
        reassuranceNote: '¡No hay penalización por equivocarse! Aquí aprenderás los trucos más comunes.',
        componentKey: 'security-quiz-simulator'
      },
      {
        id: 3,
        title: 'Cómo cerrar ventanas trampa (Pop-ups)',
        subtitle: 'Aprende a salir de avisos falsos sin tocar donde no debes.',
        explanation: 'A veces al navegar aparece una ventana repentina que dice "¡Tienes 5 virus!" o "¡Haz clic aquí para limpiar tu equipo!". Son avisos falsos para asustarte. Lo único que debes hacer es buscar la pequeña X blanca en la esquina superior.',
        audioText: 'Cuando aparezca un aviso alarmante que no pediste, no toques los botones de colores dentro del mensaje. Busca la letra equis de la esquina para cerrarlo con tranquilidad.',
        instructionPrompt: 'Encuentra la "X" segura para cerrar el aviso engañoso sin pulsar los botones trampa.',
        reassuranceNote: 'Nunca hagas caso a mensajes que te gritan con letras rojas o cuentas regresivas.',
        componentKey: 'security-popup-closer-practice'
      },
      {
        id: 4,
        title: 'Tu Decálogo de Seguridad para Guardar o Imprimir',
        subtitle: 'Una guía clara y resumida para tener siempre cerca de tu pantalla.',
        explanation: '¡Felicitaciones! Has aprendido las herramientas más importantes para cuidarte en el mundo digital. Aquí tienes tu resumen de seguridad listo para leer o imprimir si lo deseas.',
        audioText: 'Has completado la sección de seguridad. Ahora tienes el conocimiento necesario para navegar con total tranquilidad y confianza.',
        instructionPrompt: 'Revisa tu decálogo y descarga o imprime tu resumen de seguridad si lo deseas.',
        reassuranceNote: 'Ahora eres un navegante precavido y seguro en Windows.',
        componentKey: 'security-checklist-summary'
      }
    ]
  }
];

export const SIMULATED_EMAILS: EmailMessage[] = [
  {
    id: 'mail-1',
    sender: 'Tu Hijo (Carlos)',
    senderEmail: 'carlos.familia@gmail.com',
    subject: '¡Hola Papá! Mira las fotos del domingo',
    date: 'Hoy, 10:30 AM',
    preview: 'Hola papá, te envío las fotos que tomamos el fin de semana en el jardín con los nietos...',
    body: '¡Hola Papá!\n\nTe envío un abrazo muy fuerte. Te adjunto las fotos que tomamos el domingo en el almuerzo familiar. Los nietos preguntaron por ti y están muy contentos de que estés aprendiendo a usar la computadora.\n\nAvísame si puedes verlas bien y si te gustó la foto del jardín.\n\n¡Te queremos mucho!',
    avatarColor: 'bg-blue-600',
    isRead: false,
    hasAttachment: true,
    attachmentName: 'Fotos_Almuerzo_Familiar.jpg',
    attachmentType: 'photo'
  },
  {
    id: 'mail-2',
    sender: 'Biblioteca Municipal',
    senderEmail: 'avisos@bibliotecamunicipal.org',
    subject: 'Confirmación: Tu libro reservado ya está disponible',
    date: 'Ayer, 4:15 PM',
    preview: 'Estimado socio, le informamos que el libro "Historia del Arte" que solicitó ya está listo para recoger...',
    body: 'Estimado socio:\n\nLe informamos que el libro que solicitó en reserva ya se encuentra disponible en el mostrador central de la biblioteca.\n\nPuede pasar a retirarlo de lunes a viernes de 9:00 a 20:00 h.\n\nAtentamente,\nEl equipo de la Biblioteca.',
    avatarColor: 'bg-emerald-600',
    isRead: true
  },
  {
    id: 'mail-3',
    sender: 'Centro de Salud',
    senderEmail: 'citas@centromedicofamiliar.es',
    subject: 'Recordatorio de cita médica para el jueves',
    date: 'Hace 3 días',
    preview: 'Le recordamos que tiene cita programada con el Dr. Martínez el próximo jueves a las 11:00...',
    body: 'Estimado paciente:\n\nLe recordamos su cita para el control de rutina:\n- Médico: Dr. Juan Martínez\n- Fecha: Jueves a las 11:00 AM\n- Consulta número: 4\n\nNo es necesario acudir en ayunas. Si necesita reprogramar, por favor avísenos con anticipación.',
    avatarColor: 'bg-teal-600',
    isRead: true
  }
];

export const SECURITY_QUIZ_CASES: SecurityQuizCase[] = [
  {
    id: 'case-1',
    scenarioTitle: 'Caso 1: Correo urgente del "Banco"',
    fromName: 'Seguridad Banco Santander',
    fromEmail: 'soporte-urgente@banco-bloqueos-9988.xyz',
    subject: '🚨 ¡URGENTE! Su cuenta ha sido bloqueada. Ingrese su clave ahora',
    body: 'Estimado cliente:\nDetectamos un acceso no autorizado. Debe ingresar urgentemente en el siguiente enlace y poner su número de tarjeta y clave secreta antes de 2 horas o su cuenta quedará cancelada permanentemente.',
    actionText: 'Hacer clic en: http://recuperar-mi-cuenta-banco-falso.xyz/login',
    isScam: true,
    clues: [
      'La dirección de correo termina en un sitio extraño (@banco-bloqueos-9988.xyz) en vez de @santander.com',
      'Usa palabras de pánico y límite de tiempo urgente ("en 2 horas")',
      'Te pide ingresar tu número de tarjeta y clave secreta (los bancos NUNCA piden esto por correo)'
    ],
    explanationWhy: '¡Es un engaño muy común (Phishing)! Los estafadores usan la prisa y el miedo para que no pienses con calma. El banco real nunca te pedirá tu clave secreta por internet.',
    goldenRule: 'Regla: Si un mensaje te asusta o te apura con tu dinero, no hagas clic. Ve directamente a la oficina de tu banco o llama por teléfono.'
  },
  {
    id: 'case-2',
    scenarioTitle: 'Caso 2: Mensaje de tu hija Carmen',
    fromName: 'Carmen (Tu Hija)',
    fromEmail: 'carmen.lopez92@gmail.com',
    subject: 'Receta de la tarta de manzana que me pediste',
    body: 'Hola Papá, aquí tienes los ingredientes que usamos el sábado: 4 manzanas, 2 tazas de harina, canela y una cucharadita de azúcar. ¡Queda deliciosa!',
    actionText: 'No hay enlaces extraños ni peticiones raras',
    isScam: false,
    clues: [
      'La dirección de correo coincide exactamente con la que siempre usa tu hija',
      'El tono es cariñoso y responde a una conversación real',
      'No te pide dinero, ni contraseñas, ni te da prisa'
    ],
    explanationWhy: '¡Es un correo 100% auténtico y seguro! Viene de una persona que conoces y el contenido es una receta de cocina normal.',
    goldenRule: 'Regla: Los correos de familiares y amigos sin peticiones raras son completamente seguros.'
  },
  {
    id: 'case-3',
    scenarioTitle: 'Caso 3: ¡Ganaste un teléfono gratis!',
    fromName: 'Centro de Premios Internacional',
    fromEmail: 'ganador1000@sorteos-gratuitos-premios-locos.top',
    subject: '🎉 ¡Felicidades! Eres el visitante 1.000.000 y ganaste un iPhone gratis',
    body: '¡Has sido seleccionado al azar! Para reclamar tu teléfono último modelo totalmente gratis, solo debes pagar 3 euros de gastos de envío introduciendo tu tarjeta de crédito.',
    actionText: 'Hacer clic en: "RECLAMAR MI PREMIO AHORA"',
    isScam: true,
    clues: [
      'Nadie regala teléfonos caros a desconocidos en Internet',
      'El remitente es una dirección extraña y sospechosa',
      'Te piden los datos de tu tarjeta con la excusa de pagar "un pequeño envío"'
    ],
    explanationWhy: '¡Es una trampa clásica! Dicen que el premio es gratis pero la trampa es sacarte los números de tu tarjeta para cobrarte dinero.',
    goldenRule: 'Regla: Si parece demasiado bueno para ser verdad, es una estafa. Si no compraste un boleto, no ganaste ningún sorteo.'
  },
  {
    id: 'case-4',
    scenarioTitle: 'Caso 4: Aviso de envío de un paquete que compraste',
    fromName: 'Correos / Envío Postal',
    fromEmail: 'servicio-urgente@paquetes-multas-aduanas24.info',
    subject: 'Su paquete no pudo ser entregado. Pague la tasa aduanera',
    body: 'Su paquete está retenido en almacén. Debe pagar 1,85 € de aduanas haciendo clic aquí inmediatamente para no devolverlo a fábrica.',
    actionText: 'Hacer clic en: "Pagar tasa de aduana urgente"',
    isScam: true,
    clues: [
      'Ni siquiera estabas esperando ningún paquete del extranjero',
      'La dirección de correo (@paquetes-multas-aduanas24.info) no es la web oficial de Correos',
      'Utiliza la táctica de cobrar una cantidad pequeña para que la gente no sospeche'
    ],
    explanationWhy: '¡Es un engaño muy habitual de falsos paquetes! Si no estás esperando un paquete o tienes dudas, nunca pagues nada a través de enlaces en correos.',
    goldenRule: 'Regla: Cuando recibas un aviso de entrega desconocido, no toques ningún enlace.'
  }
];

export const HARDWARE_PARTS = [
  {
    id: 'pantalla',
    name: 'La Pantalla o Monitor',
    icon: 'Monitor',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    analogy: 'Es como la pantalla de tu televisor en el salón.',
    whatItDoes: 'Te muestra visualmente las cartas, fotos, vídeos y páginas web.',
    safeTip: 'No se rompe por tocar botones en el teclado.'
  },
  {
    id: 'raton',
    name: 'El Ratón (Mouse)',
    icon: 'MousePointer',
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    analogy: 'Es la extensión de tu dedo índice en la pantalla.',
    whatItDoes: 'Mueve la flecha blanca para señalar y pulsar botones con suavidad.',
    safeTip: 'El botón izquierdo es el principal para elegir cosas.'
  },
  {
    id: 'teclado',
    name: 'El Teclado',
    icon: 'Keyboard',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    analogy: 'Es como una máquina de escribir moderna y suave.',
    whatItDoes: 'Te permite escribir palabras, cartas, números y borrar errores.',
    safeTip: 'La tecla de flecha hacia atrás (←) borra cualquier error fácilmente.'
  },
  {
    id: 'torre',
    name: 'La Torre o Cerebro (CPU y Disco Duro)',
    icon: 'HardDrive',
    color: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    analogy: 'Es el armario gigante donde se guardan tus recuerdos.',
    whatItDoes: 'Adentro están el disco duro (que guarda las fotos) y el procesador (que calcula).',
    safeTip: 'Tus fotos no se borran al apagar la computadora; se quedan guardadas en el disco.'
  },
  {
    id: 'wifi',
    name: 'El Módem y WiFi',
    icon: 'Wifi',
    color: 'bg-sky-100 text-sky-900 border-sky-300',
    analogy: 'Como la antena de radio que capta música por el aire.',
    whatItDoes: 'Lleva la señal de Internet a tu computadora sin necesidad de cables.',
    safeTip: 'Si no hay internet, la computadora sigue funcionando para escribir o ver fotos.'
  }
];

export const MYTHS_LIST = [
  {
    id: 'myth-1',
    myth: '¿Es verdad que "Google" es lo mismo que "Internet"?',
    truth: '¡Falso! Internet es la red mundial de carreteras. Google es solo una biblioteca de búsqueda dentro de esa red.',
    explanation: 'Puedes entrar a Internet con tu navegador (como Microsoft Edge o Chrome) y visitar periódicos directamente sin pasar por Google.'
  },
  {
    id: 'myth-2',
    myth: '¿Si cierro una ventana de fotos, se borran mis recuerdos?',
    truth: '¡Totalmente falso! Solo cerraste la vista en la pantalla.',
    explanation: 'Tus fotos siguen intactas en la carpeta "Imágenes" de tu disco duro. Es como cerrar un álbum de fotos y dejarlo en el cajón.'
  },
  {
    id: 'myth-3',
    myth: '¿Si me equivoco de tecla puedo romper la computadora?',
    truth: '¡Falso! No puedes romper nada físico por pulsar teclas.',
    explanation: 'Todo tiene botón de cerrar, borrar o deshacer. La computadora es resistente y paciente.'
  },
  {
    id: 'myth-4',
    myth: '¿Microsoft Edge y Google Chrome son cosas totalmente distintas?',
    truth: '¡Falso! Son dos marcas de navegadores que hacen exactamente lo mismo.',
    explanation: 'Son como un coche Seat y un coche Renault: ambos te llevan al mismo destino por las mismas carreteras.'
  },
  {
    id: 'myth-5',
    myth: '¿Gmail y Outlook son incompatibles entre sí?',
    truth: '¡Falso! Puedes escribir desde tu cuenta de Outlook a alguien que tenga Gmail y viceversa.',
    explanation: 'Llegan al instante igual que una carta tradicional llega a cualquier buzón.'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Clic (Click)',
    simpleMeaning: 'Pulsar una vez el botón del ratón sobre algo que ves en la pantalla.',
    realWorldAnalogy: 'Es como señalar con el dedo un timbre y tocarlo suavemente.',
    example: 'Hacer clic en "Aceptar" para continuar.',
    icon: 'MousePointer'
  },
  {
    term: 'Doble Clic',
    simpleMeaning: 'Pulsar dos veces seguidas y rápidas el botón izquierdo del ratón.',
    realWorldAnalogy: 'Como tocar dos veces la puerta con los nudillos ("toc-toc").',
    example: 'Hacer doble clic sobre un archivo para abrirlo.',
    icon: 'MousePointerClick'
  },
  {
    term: 'Sistema Operativo (Windows)',
    simpleMeaning: 'El programa principal que enciende la máquina y pone los botones y menús.',
    realWorldAnalogy: 'Es el director de orquesta que coordina todos los instrumentos.',
    example: 'Windows 11 es el sistema operativo de tu computadora.',
    icon: 'Laptop'
  },
  {
    term: 'Navegador Web (Edge / Chrome)',
    simpleMeaning: 'El programa que usas para viajar por Internet y ver páginas.',
    realWorldAnalogy: 'Es tu coche o autobús para circular por las carreteras digitales.',
    example: 'Abrir Microsoft Edge para consultar el periódico.',
    icon: 'Globe'
  },
  {
    term: 'Buscador (Google / Bing)',
    simpleMeaning: 'Una página web que busca información cuando escribes lo que quieres saber.',
    realWorldAnalogy: 'Es como el bibliotecario que te busca el libro exacto en las estanterías.',
    example: 'Buscar en Google "Recetas de cocina fáciles".',
    icon: 'Search'
  },
  {
    term: 'Enlace o Link',
    simpleMeaning: 'Un texto subrayado o botón azul que al tocarlo te lleva a otra página web.',
    realWorldAnalogy: 'Es como una puerta o un túnel que te transporta a otra habitación.',
    example: 'Hacer clic en el enlace azul para leer la noticia.',
    icon: 'Link'
  },
  {
    term: 'Pestaña (Tab)',
    simpleMeaning: 'Hojas dentro de la ventana de tu navegador para ver varias páginas a la vez.',
    realWorldAnalogy: 'Como poner separadores de colores en un libro de lectura.',
    example: 'Tener una pestaña con el periódico y otra con recetas de cocina.',
    icon: 'Layers'
  },
  {
    term: 'Descargar (Download)',
    simpleMeaning: 'Copiar una foto, archivo o documento desde Internet a tu computadora.',
    realWorldAnalogy: 'Como comprar un libro en la tienda y guardarlo en tu estantería de casa.',
    example: 'Descargar las fotos que te mandaron los nietos para verlas sin conexión.',
    icon: 'Download'
  },
  {
    term: 'WiFi',
    simpleMeaning: 'La conexión invisible por ondas de radio que le da Internet a tu computadora.',
    realWorldAnalogy: 'Como la sintonía de una radio que viaja por el aire sin cables.',
    example: 'Tener buena señal de WiFi para ver videos fluidos.',
    icon: 'Wifi'
  },
  {
    term: 'Contraseña (Password)',
    simpleMeaning: 'Tu palabra o clave secreta para entrar a tu correo o banco.',
    realWorldAnalogy: 'Es la llave metálica de la puerta de tu casa: no se la das a cualquiera.',
    example: 'Escribir tu contraseña para abrir tu correo personal.',
    icon: 'Key'
  },
  {
    term: 'Virus / Estafa (Phishing)',
    simpleMeaning: 'Programas o mensajes trampa que intentan engañar a la gente.',
    realWorldAnalogy: 'Un vendedor falso en la calle que promete oro pero vende piedras.',
    example: 'Ignorar correos sospechosos que piden tus datos bancarios.',
    icon: 'ShieldAlert'
  },
  {
    term: 'Reiniciar',
    simpleMeaning: 'Apagar la computadora y que se vuelva a encender sola, fresca y limpia.',
    realWorldAnalogy: 'Como echarse una buena siesta reparadora cuando uno está cansado.',
    example: 'Si la pantalla se queda lenta, reiniciar soluciona el 90% de los problemas.',
    icon: 'RotateCcw'
  }
];

export const SAFETY_CHECKLIST = [
  '🛡️ 1. Tu banco y el gobierno NUNCA te pedirán contraseñas ni números de tarjeta por correo o SMS.',
  '🚨 2. Si un mensaje te mete prisa ("¡Tienes 1 hora o te bloqueamos!"), es falso el 99% de las veces.',
  '🎁 3. Nadie regala premios millonarios ni teléfonos gratis por Internet a personas que no conocen.',
  '👀 4. Fíjate en quién te manda el mensaje: mira la dirección completa de correo, no solo el nombre bonito.',
  '❌ 5. Si sale una ventana que no pediste diciendo que tienes un virus, no toques nada: ciérrala con la "X" de la esquina.',
  '👨‍👩‍👧 6. Ante cualquier duda, para, respira y pregúntale a tu hijo/a o a una persona de confianza antes de hacer clic.'
];
