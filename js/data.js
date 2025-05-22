const courseContent = [
    {
        id: 'intro',
        title: 'Introducción a la Neumática y Actuadores Lineales',
        icon: 'fas fa-cogs',
        lessons: [
            {
                id: 'intro-1',
                title: '¿Qué es la Neumática?',
                content: `
                    <div class="content-block">
                        <p>La <span class="highlight">Neumática</span> es la tecnología que emplea el aire comprimido como modo de transmisión de la energía necesaria para activar y hacer funcionar mecanismos. Es una rama de la mecánica que estudia el movimiento de fluidos, específicamente gases y vapores.</p>
                        <p>Es ampliamente utilizada en la industria debido a su limpieza, seguridad y facilidad de control.</p>
                    </div>
                    <div class="content-block">
                        <h3>Ventajas de la Neumática</h3>
                        <ul>
                            <li><i class="fas fa-check-circle" style="color: var(--success-green);"></i> Limpieza: El aire es un fluido limpio, ideal para industrias como la alimentaria o farmacéutica.</li>
                            <li><i class="fas fa-check-circle" style="color: var(--success-green);"></i> Disponibilidad: El aire es abundante y gratuito.</li>
                            <li><i class="fas fa-check-circle" style="color: var(--success-green);"></i> Seguridad: No hay riesgo de explosión o incendio (a diferencia de la hidráulica).</li>
                            <li><i class="fas fa-check-circle" style="color: var(--success-green);"></i> Control Sencillo: Fácil de regular velocidad y fuerza.</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'intro-2',
                title: 'Actuadores Lineales: Cilindros de Doble Efecto',
                content: `
                    <div class="content-block">
                        <p>Los <span class="highlight">actuadores lineales</span> transforman la energía neumática en movimiento lineal. Los más comunes son los cilindros. Un <span class="highlight">cilindro de doble efecto</span> tiene dos entradas de aire, permitiendo el trabajo tanto en la carrera de salida como en la de retroceso.</p>
                    </div>
                    <div class="content-block">
                        <h3>Partes Esenciales de un Cilindro</h3>
                        <p>Arrastra los nombres de las partes a su lugar correcto en el diagrama. (Nota: Este es un ejemplo simplificado, para un detalle completo, ve a la siguiente lección).</p>
                        <div class="drag-drop-quiz" id="cylinder-parts-quiz">
                            <svg width="100%" height="auto" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 500px; display: block; margin: 0 auto 20px;">
                              <style>
                                .primary-blue { fill: rgb(0, 71, 142); }
                                .secondary-blue { fill: rgb(0, 112, 192); }
                                .light-gray { fill: rgb(242, 242, 242); }
                                .dark-gray { fill: rgb(51, 51, 51); }
                                .stroke-primary { stroke: rgb(0, 71, 142); stroke-width: 3; }
                                .stroke-secondary { stroke: rgb(0, 112, 192); stroke-width: 2; }
                                .stroke-dark { stroke: rgb(51, 51, 51); stroke-width: 1.5; }
                                .part-highlight { fill: rgba(0, 112, 192, 0.2); stroke: rgb(0, 112, 192); stroke-width: 1; stroke-dasharray: 4 2;}
                              </style>

                              <rect x="50" y="70" width="300" height="60" rx="10" ry="10" class="light-gray" stroke="rgb(0, 71, 142)" stroke-width="3"/>

                              <rect x="150" y="60" width="20" height="80" rx="5" ry="5" class="secondary-blue" stroke="rgb(0, 71, 142)" stroke-width="2"/>
                              <line x1="150" y1="60" x2="150" y2="140" class="stroke-dark"/>

                              <rect x="100" y="95" width="50" height="10" rx="3" ry="3" class="dark-gray" stroke="rgb(51, 51, 51)" stroke-width="1"/>

                              <rect x="40" y="60" width="15" height="80" rx="5" ry="5" class="primary-blue" stroke="rgb(0, 71, 142)" stroke-width="3"/>

                              <rect x="345" y="60" width="15" height="80" rx="5" ry="5" class="primary-blue" stroke="rgb(0, 71, 142)" stroke-width="3"/>

                              <rect x="350" y="80" width="10" height="5" class="dark-gray" stroke="rgb(51, 51, 51)" stroke-width="1"/>
                              <rect x="40" y="80" width="10" height="5" class="dark-gray" stroke="rgb(51, 51, 51)" stroke-width="1"/>

                              <line x1="125" y1="90" x2="125" y2="40" class="stroke-secondary"/>
                              <text x="125" y="30" text-anchor="middle" font-size="12px" fill="var(--dark-gray)">Vástago</text>

                              <line x1="160" y1="80" x2="200" y2="40" class="stroke-secondary"/>
                              <text x="200" y="30" text-anchor="middle" font-size="12px" fill="var(--dark-gray)">Émbolo</text>

                              <line x1="45" y1="70" x2="20" y2="40" class="stroke-secondary"/>
                              <text x="20" y="30" text-anchor="middle" font-size="12px" fill="var(--dark-gray)">Tapa</text>

                              <line x1="355" y1="70" x2="380" y2="40" class="stroke-secondary"/>
                              <text x="380" y="30" text-anchor="middle" font-size="12px" fill="var(--dark-gray)">Tapa</text>

                            </svg>
                            <div class="drop-targets-container" style="display:flex; justify-content: space-around; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
                                <div class="drop-target" data-correct="Vástago" id="drop-v"></div>
                                <div class="drop-target" data-correct="Émbolo" id="drop-e"></div>
                                <div class="drop-target" data-correct="Tapa" id="drop-t"></div>
                            </div>
                            <div class="drag-area" id="drag-items">
                                <div class="draggable-item" draggable="true" data-word="Vástago">Vástago</div>
                                <div class="draggable-item" draggable="true" data-word="Émbolo">Émbolo</div>
                                <div class="draggable-item" draggable="true" data-word="Tapa">Tapa</div>
                                <div class="draggable-item" draggable="true" data-word="Carcasa">Carcasa</div>
                            </div>
                            <button class="nav-button" onclick="checkDragAndDropQuiz('cylinder-parts-quiz')">Verificar</button>
                            <div class="feedback-container" id="feedback-cylinder-parts-quiz"></div>
                        </div>
                    </div>
                `
            }
        ]
    },
    {
        id: 'calculos',
        title: 'Cálculos de Cilindros y Fuerza del Émbolo',
        icon: 'fas fa-calculator',
        lessons: [
            {
                id: 'calculos-1',
                title: 'Fórmula de la Fuerza del Émbolo (F=P*A)',
                content: `
                    <div class="content-block">
                        <p>La <span class="highlight">fuerza ejercida por un actuador</span> neumático es crucial para su selección. La fuerza teórica del émbolo se calcula con la siguiente fórmula:</p>
                        <div class="formula-block">
                            <p class="formula">F = P * A</p>
                            <ul>
                                <li><strong>F:</strong> Fuerza teórica del vástago (kgf)</li>
                                <li><strong>P:</strong> Presión relativa (kg/cm²)</li>
                                <li><strong>A:</strong> Superficie del émbolo (cm²)</li>
                            </ul>
                        </div>
                    </div>
                    <div class="content-block">
                        <h3>Simulador de Fuerza de Émbolo</h3>
                        <p>Ajusta la presión y el diámetro para ver cómo cambia la fuerza.</p>
                        <div class="force-simulator">
                            <div class="input-group">
                                <label for="pressure-input">Presión (bar): <span id="pressure-value">5</span></label>
                                <input type="range" id="pressure-input" min="1" max="10" value="5" step="0.1">
                            </div>
                            <div class="input-group">
                                <label for="diameter-input">Diámetro del Émbolo (cm): <span id="diameter-value">5</span></label>
                                <input type="range" id="diameter-input" min="1" max="20" value="5" step="0.1">
                            </div>
                            <div class="result-display">
                                <p>Superficie (A): <span id="area-result">19.63</span> cm²</p>
                                <p>Fuerza Teórica (F): <span id="force-result">98.17</span> kgf</p>
                            </div>
                        </div>
                    </div>
                `
            }
        ]
    },
    {
        id: 'mecanica',
        title: 'Mecánica y Componentes del Cilindro',
        icon: 'fas fa-wrench',
        lessons: [
            {
                id: 'mecanica-1',
                title: 'Componentes Detallados del Cilindro',
                content: `
                    <div class="content-block">
                        <p>Un cilindro neumático es un dispositivo complejo con varias partes que trabajan en conjunto para convertir la energía del aire comprimido en movimiento lineal. Explora el diagrama interactivo a continuación para conocer cada componente.</p>
                        <div class="hotspot-container" id="cylinder-hotspots">
                            <svg width="100%" height="auto" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 600px; display: block; margin: 0 auto 20px;">
                                <style>
                                    .primary-blue { fill: rgb(0, 71, 142); }
                                    .secondary-blue { fill: rgb(0, 112, 192); }
                                    .light-gray { fill: rgb(242, 242, 242); }
                                    .dark-gray { fill: rgb(51, 51, 51); }
                                    .stroke-primary { stroke: rgb(0, 71, 142); stroke-width: 3; }
                                    .stroke-secondary { stroke: rgb(0, 112, 192); stroke-width: 2; }
                                    .stroke-dark { stroke: rgb(51, 51, 51); stroke-width: 1.5; }
                                    .stroke-thin { stroke: rgb(150, 150, 150); stroke-width: 1; }
                                    .fill-accent { fill: rgba(0, 112, 192, 0.1); }

                                    .highlight-overlay {
                                        fill: none;
                                        stroke: none;
                                        transition: fill 0.3s ease, stroke 0.3s ease, filter 0.3s ease;
                                    }
                                    .highlight-overlay.active-highlight {
                                        fill: rgba(0, 112, 192, 0.3);
                                        stroke: rgb(0, 112, 192);
                                        stroke-width: 4;
                                        filter: drop-shadow(0 0 8px rgba(0, 112, 192, 0.8));
                                    }
                                </style>

                                <rect id="svg-camisa" x="100" y="100" width="600" height="250" rx="15" ry="15" class="light-gray" stroke="rgb(0, 71, 142)" stroke-width="4"/>

                                <rect id="svg-tapa-delantera" x="95" y="80" width="20" height="290" rx="10" ry="10" class="primary-blue" stroke="rgb(0, 71, 142)" stroke-width="4"/>
                                <rect id="svg-tapa-trasera" x="685" y="80" width="20" height="290" rx="10" ry="10" class="primary-blue" stroke="rgb(0, 71, 142)" stroke-width="4"/>

                                <rect id="svg-embolo" x="300" y="110" width="40" height="230" rx="8" ry="8" class="secondary-blue" stroke="rgb(0, 71, 192)" stroke-width="2"/>
                                <line x1="300" y1="110" x2="300" y2="340" class="stroke-dark"/>
                                <line x1="340" y1="110" x2="340" y2="340" class="stroke-dark"/>

                                <rect id="svg-vastago" x="150" y="215" width="150" height="20" rx="5" ry="5" class="dark-gray" stroke="rgb(51, 51, 51)" stroke-width="1"/>

                                <circle cx="95" cy="225" r="15" fill="var(--fill-accent)" stroke="rgb(0, 112, 192)" stroke-width="2" stroke-dasharray="4 2"/>

                                <circle id="svg-junta-embolo-top" cx="320" cy="115" r="6" fill="var(--dark-gray)" stroke="var(--primary-blue)" stroke-width="1"/>
                                <circle id="svg-junta-embolo-bottom" cx="320" cy="335" r="6" fill="var(--dark-gray)" stroke="var(--primary-blue)" stroke-width="1"/>

                                <rect id="svg-junta-vastago" x="90" y="210" width="10" height="30" rx="3" ry="3" fill="var(--dark-gray)" stroke="var(--primary-blue)" stroke-width="1"/>

                                <rect x="700" y="150" width="20" height="10" class="dark-gray" stroke="rgb(51, 51, 51)" stroke-width="1"/>
                                <rect x="700" y="300" width="20" height="10" class="dark-gray" stroke="rgb(51, 51, 51)" stroke-width="1"/>
                                <rect x="80" y="150" width="20" height="10" class="dark-gray" stroke="rgb(51, 51, 51)" stroke-width="1"/>
                                <rect x="80" y="300" width="20" height="10" class="dark-gray" stroke="rgb(51, 51, 51)" stroke-width="1"/>

                                <line x1="720" y1="155" x2="750" y2="155" class="stroke-thin"/>
                                <line x1="720" y1="305" x2="750" y2="305" class="stroke-thin"/>
                                <line x1="80" y1="155" x2="50" y2="155" class="stroke-thin"/>
                                <line x1="80" y1="305" x2="50" y2="305" class="stroke-thin"/>

                                <rect id="highlight-vastago" x="150" y="215" width="150" height="20" rx="5" ry="5" class="highlight-overlay"/>
                                <rect id="highlight-embolo" x="300" y="110" width="40" height="230" rx="8" ry="8" class="highlight-overlay"/>
                                <rect id="highlight-tapa-trasera" x="685" y="80" width="20" height="290" rx="10" ry="10" class="highlight-overlay"/>
                                <rect id="highlight-tapa-delantera" x="95" y="80" width="20" height="290" rx="10" ry="10" class="highlight-overlay"/>
                                <rect id="highlight-camisa" x="100" y="100" width="600" height="250" rx="15" ry="15" class="highlight-overlay"/>
                                <rect id="highlight-junta-vastago" x="90" y="210" width="10" height="30" rx="3" ry="3" class="highlight-overlay"/>
                                <rect id="highlight-junta-embolo" x="300" y="110" width="40" height="230" rx="8" ry="8" class="highlight-overlay"/>
                            </svg>
                            <div class="hotspot" style="top: 50%; left: 15%;" data-info-id="vastago">1</div>
                            <div class="hotspot" style="top: 45%; left: 45%;" data-info-id="embolo">2</div>
                            <div class="hotspot" style="top: 20%; left: 89%;" data-info-id="tapa-trasera">3</div>
                            <div class="hotspot" style="top: 80%; left: 11%;" data-info-id="tapa-delantera">4</div>
                            <div class="hotspot" style="top: 50%; left: 75%;" data-info-id="camisa">5</div>
                            <div class="hotspot" style="top: 55%; left: 25%;" data-info-id="junta-vastago">6</div>
                            <div class="hotspot" style="top: 40%; left: 55%;" data-info-id="junta-embolo">7</div>

                            <div class="hotspot-info" id="info-vastago" style="top: 50%; left: 20%;">
                                <h4>1. Vástago</h4>
                                <p>Elemento que transmite la fuerza y el movimiento al exterior del cilindro.</p>
                            </div>
                            <div class="hotspot-info" id="info-embolo" style="top: 45%; left: 50%;">
                                <h4>2. Émbolo</h4>
                                <p>Divide el cilindro en dos cámaras y es impulsado por el aire.</p>
                            </div>
                             <div class="hotspot-info" id="info-tapa-trasera" style="top: 20%; left: 90%;">
                                <h4>3. Tapa Trasera</h4>
                                <p>Cierra el cilindro por un extremo, contiene la entrada de aire.</p>
                            </div>
                            <div class="hotspot-info" id="info-tapa-delantera" style="top: 80%; left: 10%;">
                                <h4>4. Tapa Delantera</h4>
                                <p>Cierra el cilindro por el otro extremo, con orificio para el vástago.</p>
                            </div>
                            <div class="hotspot-info" id="info-camisa" style="top: 50%; left: 80%;">
                                <h4>5. Camisa (Cuerpo del Cilindro)</h4>
                                <p>Cuerpo principal cilíndrico donde se desliza el émbolo.</p>
                            </div>
                            <div class="hotspot-info" id="info-junta-vastago" style="top: 55%; left: 30%;">
                                <h4>6. Junta de Vástago</h4>
                                <p>Sella el vástago para evitar fugas de aire al exterior.</p>
                            </div>
                            <div class="hotspot-info" id="info-junta-embolo" style="top: 40%; left: 60%;">
                                <h4>7. Junta de Émbolo</h4>
                                <p>Sella el émbolo contra la camisa para separar las cámaras de aire.</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'mecanica-2',
                title: 'Tipos de Juntas y su Función',
                content: `
                    <div class="content-block">
                        <p>Las juntas son componentes críticos en los cilindros neumáticos, asegurando la estanqueidad y el rendimiento. Se clasifican principalmente en dinámicas y estáticas.</p>
                        <div class="categorization-quiz" id="juntas-categorization-quiz">
                            <h3>Clasifica las Juntas por su Función</h3>
                            <div class="categories-container">
                                <div class="category-drop-target" data-category="Dinámica">
                                    <h4>Juntas Dinámicas</h4>
                                    <p>Hermetizan piezas con movimiento relativo.</p>
                                    <ul class="dropped-items-list"></ul>
                                </div>
                                <div class="category-drop-target" data-category="Estática">
                                    <h4>Juntas Estáticas</h4>
                                    <p>Hermetizan piezas sin movimiento relativo.</p>
                                    <ul class="dropped-items-list"></ul>
                                </div>
                                <div class="category-drop-target" data-category="Protección">
                                    <h4>Juntas de Protección</h4>
                                    <p>Impiden la entrada de suciedad.</p>
                                    <ul class="dropped-items-list"></ul>
                                </div>
                            </div>
                            <div class="items-to-drag">
                                <div class="draggable-category-item" draggable="true" data-item="Junta de Émbolo" data-correct-category="Dinámica">Junta de Émbolo</div>
                                <div class="draggable-category-item" draggable="true" data-item="Anillo Tórico" data-correct-category="Estática">Anillo Tórico</div>
                                <div class="draggable-category-item" draggable="true" data-item="Limpiador de Vástago" data-correct-category="Protección">Limpiador de Vástago</div>
                                <div class="draggable-category-item" draggable="true" data-item="Junta de Vástago" data-correct-category="Dinámica">Junta de Vástago</div>
                                <div class="draggable-category-item" draggable="true" data-item="Junta de Tapa" data-correct-category="Estática">Junta de Tapa</div>
                            </div>
                            <button class="nav-button" onclick="checkCategorizationQuiz('juntas-categorization-quiz')">Verificar Categorías</button>
                            <div class="categorization-feedback" id="feedback-juntas-categorization-quiz"></div>
                        </div>
                    </div>
                `
            }
        ]
    },
    {
        id: 'simulacion-accion',
        title: 'Actividades Interactivas',
        icon: 'fas fa-play-circle',
        lessons: [
            {
                id: 'simulacion-accion-1', // Nueva lección
                title: 'Adivina el Concepto Neumático',
                content: `
                    <div class="content-block">
                        <h3>Ordena las letras para adivinar el concepto</h3>
                        
                    </div>
                `
            }
        ]
    }
    // ... más módulos y lecciones ...
];
