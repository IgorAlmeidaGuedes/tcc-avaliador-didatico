import React, { useEffect, useState } from 'react';
import { ARESTAS } from '../../data/arestas';

interface HexagonChartProps {
    result: Record<number, boolean>;
    svgRef?: React.RefObject<SVGSVGElement>;
    onReady?: () => void;
}

interface TipoDescricao {
    id: number;
    nome: string;
    descricao: string; // HTML convertido do Markdown
}

const Hexagon: React.FC<HexagonChartProps> = ({ result, svgRef, onReady }) => {
    // Agora os textos vêm da pasta data/arestas
    const [tipos] = useState<TipoDescricao[]>(ARESTAS);

    useEffect(() => {
        onReady?.();
    }, [onReady]);

    const tiposNegativos = tipos.filter((t) => result[t.id] === false);

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

    // ---- Mapeamento exato dos 15 tipos ----
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

    const MIN_HEIGHT = 500;
    const svgHeight = Math.max(MIN_HEIGHT, 400 + tiposNegativos.length * 60);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '40px',
                width: '100%',
            }}
        >
            <svg
                ref={svgRef}
                width="100%"
                height={svgHeight}
                viewBox={`0 0 960 ${svgHeight}`}
                preserveAspectRatio="xMidYMid meet"
            >
                <rect width="100%" height="100%" fill="white" />

                {/* Linhas */}
                {edges.map(({ from, to, type }) => {
                    const color = result[type] ? 'green' : 'red';
                    return (
                        <line
                            key={type}
                            x1={points[from].x}
                            y1={points[from].y}
                            x2={points[to].x}
                            y2={points[to].y}
                            stroke={color}
                            strokeWidth="2"
                            opacity={0.9}
                        />
                    );
                })}

                {/* Pontos e textos */}
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

                {/* Textos negativos */}
                {tiposNegativos.map((t, index) => (
                    <foreignObject
                        key={t.id}
                        x={20}
                        y={350 + index * 60}
                        width={900}
                        height={120}
                    >
                        <div
                            style={{
                                fontSize: '13px',
                                lineHeight: '1.4',
                                fontFamily: 'Arial, sans-serif',
                                color: '#000',
                                textAlign: 'left',
                            }}
                        >
                            <p>
                                <strong>{t.nome}</strong>
                            </p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: t.descricao,
                                }}
                            />
                        </div>
                    </foreignObject>
                ))}
            </svg>
        </div>
    );
};

export default Hexagon;
