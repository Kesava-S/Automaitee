import { useEffect, useState } from 'react';
import { Settings, Zap, Cpu, Share2, Bot, Workflow, Sparkles } from 'lucide-react';

const shapes = [
    // Geometric Shapes
    { type: 'circle', color: '#0071e3', size: 15, top: '12%', left: '10%', delay: 0 },
    { type: 'triangle', color: '#ff3b30', size: 20, top: '18%', left: '85%', delay: 1.5 },
    { type: 'square', color: '#34c759', size: 18, top: '75%', left: '8%', delay: 2.2 },
    { type: 'circle', color: '#ff9f0a', size: 12, top: '85%', left: '88%', delay: 0.8 },

    // Tech & Automation Icons
    { type: 'icon', Icon: Settings, color: '#86868b', size: 24, top: '25%', left: '75%', delay: 3 }, // Gear (Automation)
    { type: 'icon', Icon: Zap, color: '#ffcc00', size: 22, top: '60%', left: '82%', delay: 1.2 },    // Speed/Energy
    { type: 'icon', Icon: Share2, color: '#0071e3', size: 26, top: '20%', left: '25%', delay: 2.8 }, // Connections (Integration)
    { type: 'icon', Icon: Cpu, color: '#34c759', size: 24, top: '65%', left: '15%', delay: 0.5 },    // Tech/Chip
    { type: 'icon', Icon: Workflow, color: '#af52de', size: 24, top: '45%', left: '92%', delay: 3.5 }, // Workflow
    { type: 'icon', Icon: Bot, color: '#5856d6', size: 28, top: '35%', left: '5%', delay: 2.0 },     // AI/Bot
    { type: 'icon', Icon: Sparkles, color: '#ff2d55', size: 20, top: '15%', left: '50%', delay: 4.1 }, // Magic/AI
];

export default function FloatingShapes() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
        }}>
            {shapes.map((shape, i) => (
                <div
                    key={i}
                    className={`floating-shape shape-${shape.type}`}
                    style={{
                        position: 'absolute',
                        top: shape.top,
                        left: shape.left,
                        width: `${shape.size}px`,
                        height: `${shape.size}px`,
                        // Apply CSS shape styles only if it's NOT an icon
                        backgroundColor: (shape.type !== 'triangle' && shape.type !== 'icon') ? shape.color : 'transparent',
                        borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '4px' : '0',
                        borderBottom: shape.type === 'triangle' ? `${shape.size}px solid ${shape.color}` : 'none',
                        borderLeft: shape.type === 'triangle' ? `${shape.size / 2}px solid transparent` : 'none',
                        borderRight: shape.type === 'triangle' ? `${shape.size / 2}px solid transparent` : 'none',
                        color: shape.type === 'icon' ? shape.color : undefined, // Check for icon color
                        opacity: 0.5,
                        animation: `float ${7 + i}s ease-in-out infinite`,
                        animationDelay: `${shape.delay}s`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {shape.type === 'icon' && shape.Icon && (
                        <shape.Icon size={shape.size} strokeWidth={2} />
                    )}
                </div>
            ))}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-15px) rotate(10deg); }
                    66% { transform: translateY(10px) rotate(-10deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                /* Additional rotation for geometric shapes for more dynamism */
                .shape-triangle, .shape-square {
                     animation: floatRotate 8s ease-in-out infinite alternate !important;
                }
                 @keyframes floatRotate {
                    0% { transform: translateY(0px) rotate(0deg); }
                    100% { transform: translateY(-20px) rotate(180deg); }
                }
            `}</style>
        </div>
    );
}
