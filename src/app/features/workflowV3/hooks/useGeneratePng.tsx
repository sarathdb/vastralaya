import { useCallback } from 'react';
import { getNodesBounds, getViewportForBounds } from 'reactflow';
import { toPng } from 'html-to-image';

function useGeneratePng() {
    const generatePng = useCallback(
        (element, htmlNode, reactflowNodes) => {
            if (element && htmlNode && reactflowNodes) {
                const rect = element.getBoundingClientRect();
                const imageWidth = rect.width || 1024;
                const imageHeight = rect.height || 768;
                const nodesBounds = getNodesBounds(reactflowNodes);
                const transform = getViewportForBounds(
                    nodesBounds,
                    imageWidth,
                    imageHeight,
                    0.5,
                    2
                );

                const pngPromise = toPng(htmlNode, {
                    backgroundColor: '#F1F5F7',
                    width: imageWidth,
                    height: imageHeight,
                    style: {
                        width: `${imageWidth}px`,
                        height: `${imageHeight}px`,
                        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
                    },
                });

                return pngPromise;
            }
            return Promise.resolve(null); // Return a resolved promise for consistency
        },
        []
    );

    return generatePng;
}

export default useGeneratePng;