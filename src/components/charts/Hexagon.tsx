import React, { useEffect, useState, useRef } from 'react';
import { ARESTAS } from '../../data/arestas';

interface HexagonChartProps {
    result: Record<number, boolean>;
    svgRef?: React.RefObject<SVGSVGElement>;
    onReady?: (data: { html: string }) => void;
}

interface TipoDescricao {
    id: number;
    nome: string;
    descricao: string; // HTML vindo do markdown
}

const Hexagon: React.FC<HexagonChartProps> = ({ result, svgRef, onReady }) => {
    const [tipos] = useState<TipoDescricao[]>(ARESTAS);

    const measureRef = useRef<HTMLDivElement>(null);
    const [, setContentHeight] = useState(0);

    const tiposNegativos = tipos.filter((t) => result[t.id] === false);

    useEffect(() => {
        if (measureRef.current) {
            const rect = measureRef.current.getBoundingClientRect();
            setContentHeight(rect.height);
        }
    }, [tiposNegativos]);

    useEffect(() => {
        if (onReady) {
            onReady({
                html: tiposNegativos
                    .map((t) => `<div class="section">${t.descricao}</div>`)
                    .join(''),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tiposNegativos]);

    const radius = 100;
    const center = { x: 500, y: 175 };

    const vertexLabels = [
        'Professor',
        'Objetivos',
        'Aluno',
        'Técnicas e Recursos',
        'Conteúdo',
        ['Organização/', 'Sociedade'],
    ];

    const labelOffsets = [
        { dx: 0, dy: -25 },
        { dx: 30, dy: -10 },
        { dx: 30, dy: 20 },
        { dx: 0, dy: 35 },
        { dx: -40, dy: 20 },
        { dx: -40, dy: -10 },
    ];

    const points = Array.from({ length: 6 }).map((_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        return {
            x: center.x + radius * Math.cos(angle),
            y: center.y + radius * Math.sin(angle),
        };
    });

    const edges = [
        { from: 0, to: 1, type: 1 }, // Professor - Objetivos
        { from: 1, to: 2, type: 2 }, // Objetivos - Aluno
        { from: 2, to: 3, type: 3 }, // Aluno - Técnicas e Recursos
        { from: 3, to: 4, type: 4 }, // Técnicas e Recursos - Conteúdo
        { from: 4, to: 5, type: 5 }, // Conteúdo - Organização/Sociedade
        { from: 5, to: 0, type: 6 }, // Organização/Sociedade - Professor

        { from: 0, to: 4, type: 7 }, // Professor - Conteúdo
        { from: 0, to: 3, type: 8 }, // Professor - Técnicas e Recursos
        { from: 0, to: 2, type: 9 }, // Professor - Aluno

        { from: 1, to: 5, type: 10 }, // Objetivos - Organização/Sociedade
        { from: 1, to: 4, type: 11 }, // Objetivos - Conteúdo
        { from: 1, to: 3, type: 12 }, // Objetivos - Técnicas e Recursos

        { from: 2, to: 5, type: 13 }, // Aluno - Organização/Sociedade
        { from: 2, to: 4, type: 14 }, // Aluno - Conteúdo

        { from: 3, to: 5, type: 15 }, // Técnicas e Recursos - Organização/Sociedade
    ];

    return (
        <div
            style={{
                background: 'white',
                padding: '20px',
                maxWidth: '900px',
                margin: '0 auto',
                borderRadius: '8px',
            }}
        >
            {/* BLOCO INVISÍVEL PARA MEDIR ALTURA DO TEXTO */}
            <div
                ref={measureRef}
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                    pointerEvents: 'none',
                    left: 0,
                    right: 0,
                    top: 0,
                    width: 'calc(100vw - 40px)',
                    maxWidth: '900px',
                    margin: '0 auto',
                    whiteSpace: 'normal',
                }}
            >
                {tiposNegativos.map((t) => (
                    <div key={t.id}>
                        <div
                            dangerouslySetInnerHTML={{ __html: t.descricao }}
                            style={{ whiteSpace: 'normal' }}
                        />
                    </div>
                ))}
            </div>

            {/* SVG DO GRÁFICO */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: window.innerWidth < 600 ? '10px' : '40px',
                    width: '100%',
                }}
            >
                <svg
                    ref={svgRef}
                    width="100%"
                    height={350}
                    viewBox="0 0 900 350"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <rect width="100%" height="100%" fill="white" />

                    {edges.map(({ from, to, type }) => (
                        <line
                            key={type}
                            x1={points[from].x}
                            y1={points[from].y}
                            x2={points[to].x}
                            y2={points[to].y}
                            stroke={result[type] ? '#0072B2' : '#D55E00'}
                            strokeWidth="2"
                            opacity={0.9}
                        />
                    ))}

                    {points.map((p, i) => (
                        <g key={i}>
                            <circle cx={p.x} cy={p.y} r="6" fill="#333" />

                            <text
                                x={p.x + labelOffsets[i].dx}
                                y={p.y + labelOffsets[i].dy}
                                textAnchor="middle"
                                fontSize="12"
                                fill="#000"
                                fontWeight="bold"
                            >
                                {Array.isArray(vertexLabels[i])
                                    ? vertexLabels[i].map((line, idx) => (
                                          <tspan
                                              key={idx}
                                              x={p.x + labelOffsets[i].dx}
                                              dy={idx === 0 ? 0 : 12}
                                          >
                                              {line}
                                          </tspan>
                                      ))
                                    : vertexLabels[i]}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>

            {/* TEXTOS NEGATIVOS FAZEM PARTE DA "PÁGINA BRANCA" */}
            <div
                style={{
                    marginTop: 30,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: '#000',
                    textAlign: 'left',
                }}
            >
                {tiposNegativos.map((t) => (
                    <div
                        key={t.id}
                        style={{ marginBottom: 30 }}
                        dangerouslySetInnerHTML={{ __html: t.descricao }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hexagon;
