import { useState } from 'react';
import { motion } from 'framer-motion';

interface SaxPart {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number };
  assembled: boolean;
}

export default function SaxophoneAssembly() {
  const [parts, setParts] = useState<SaxPart[]>([
    { id: 'body', name: 'Body', description: 'Main tube with keys', position: { x: 200, y: 150 }, assembled: false },
    { id: 'neck', name: 'Neck', description: 'Connects mouthpiece to body', position: { x: 50, y: 50 }, assembled: false },
    { id: 'mouthpiece', name: 'Mouthpiece', description: 'Where you blow', position: { x: 350, y: 50 }, assembled: false },
    { id: 'reed', name: 'Reed', description: 'Vibrates to make sound', position: { x: 350, y: 250 }, assembled: false },
    { id: 'ligature', name: 'Ligature', description: 'Holds reed in place', position: { x: 50, y: 250 }, assembled: false },
  ]);

  const [draggedPart, setDraggedPart] = useState<string | null>(null);
  const [assemblyStep, setAssemblyStep] = useState(0);

  const correctOrder = ['body', 'neck', 'mouthpiece', 'reed', 'ligature'];

  const handleDragEnd = (partId: string, event: any, info: any) => {
    const target = info.point;
    
    // Check if dropped in correct position (center area)
    const centerX = 200;
    const centerY = 150;
    const distance = Math.sqrt(
      Math.pow(target.x - centerX, 2) + Math.pow(target.y - centerY, 2)
    );

    if (distance < 100 && correctOrder[assemblyStep] === partId) {
      // Correct placement
      setParts(parts.map(p => 
        p.id === partId ? { ...p, assembled: true, position: { x: centerX, y: centerY } } : p
      ));
      setAssemblyStep(assemblyStep + 1);
    } else {
      // Wrong placement or wrong part - snap back
      const part = parts.find(p => p.id === partId);
      if (part) {
        setParts(parts.map(p => 
          p.id === partId ? { ...p, position: { x: part.position.x, y: part.position.y } } : p
        ));
      }
    }
    setDraggedPart(null);
  };

  const allAssembled = parts.every(p => p.assembled);

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-lg p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      <h3 className="text-lg font-semibold text-[#1a2332] dark:text-white mb-2">
        Interactive Assembly
      </h3>
      <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-6">
        Drag each part to the center in the correct order
      </p>

      {/* Assembly Area */}
      <div className="relative w-full h-80 bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg border-2 border-dashed border-[#c8c8c8] dark:border-[#2a3545] mb-6">
        {/* Center target */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-dashed border-[#c9a84c]/30 flex items-center justify-center"
          animate={{ scale: allAssembled ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          {allAssembled ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-4xl"
            >
              🎷
            </motion.div>
          ) : (
            <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0] text-center px-4">
              Drop parts here
            </span>
          )}
        </motion.div>

        {/* Draggable Parts */}
        {parts.map((part) => (
          !part.assembled && (
            <motion.div
              key={part.id}
              drag
              dragConstraints={{ left: 0, right: 400, top: 0, bottom: 300 }}
              onDragStart={() => setDraggedPart(part.id)}
              onDragEnd={(event, info) => handleDragEnd(part.id, event, info)}
              className={`absolute cursor-move select-none ${
                draggedPart === part.id ? 'z-10' : 'z-0'
              }`}
              style={{
                left: part.position.x,
                top: part.position.y,
              }}
              whileDrag={{ scale: 1.1, zIndex: 10 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-[#c9a84c] text-[#1a2332] px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                {part.name}
              </div>
            </motion.div>
          )
        ))}

        {/* Assembled parts indicator */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {parts.map((part) => (
            <motion.div
              key={part.id}
              initial={{ scale: 0 }}
              animate={{ scale: part.assembled ? 1 : 0 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                part.assembled
                  ? 'bg-[#3a8a5c] text-white'
                  : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
              }`}
            >
              {part.name.charAt(0)}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current step hint */}
      {!allAssembled && (
        <motion.div
          key={assemblyStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#c9a84c]/5 border border-[#c9a84c]/30 dark:bg-[#c9a84c]/10 rounded-lg p-4"
        >
          <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
            <span className="font-semibold text-[#1a2332] dark:text-white">Step {assemblyStep + 1}: </span>
            Attach the <span className="font-semibold text-[#c9a84c]">{correctOrder[assemblyStep]}</span>
            {parts.find(p => p.id === correctOrder[assemblyStep]) && (
              <span className="block mt-1 text-xs">
                {parts.find(p => p.id === correctOrder[assemblyStep])?.description}
              </span>
            )}
          </p>
        </motion.div>
      )}

      {/* Success message */}
      {allAssembled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#3a8a5c]/5 border border-[#3a8a5c]/30 dark:bg-[#3a8a5c]/10 rounded-lg p-4 text-center"
        >
          <p className="text-sm font-semibold text-[#3a8a5c] mb-1">
            Saxophone Assembled!
          </p>
          <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
            You've learned the parts. Now let's make some music!
          </p>
        </motion.div>
      )}
    </div>
  );
}
