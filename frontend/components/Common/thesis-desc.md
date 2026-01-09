## Multimodal Pseudo-Labeling for 3D Object Detection in Autonomous Driving

Designed and implemented a pipeline to improve 3D object detection under limited or noisy LiDAR annotations by leveraging camera information. The thesis focuses on camera–LiDAR fusion, pseudo-label generation, and domain adaptation across datasets, targeting scalable training of 3D detectors with reduced labeling effort.

## Key Contributions and Achievements

* Developed a **camera-supported pseudo-labeling pipeline** combining monocular depth estimation, 2D detection/segmentation, and LiDAR-based 3D detection.
* Generated **pseudo-LiDAR point clouds** from monocular images using state-of-the-art depth estimation and depth correction, enabling LiDAR-free or LiDAR-augmented training.
* Implemented **projection- and segmentation-based label refinement**, updating 3D classes using 2D semantic evidence with robust matching strategies.
* Integrated and extended **OpenPCDet and nuScenes**, including custom evaluation (e.g., range-based metrics) and efficient annotation processing.
* Analyzed **domain gaps across datasets** and evaluated semi-supervised and unsupervised adaptation strategies.
* Achieved measurable **improvements in detection quality and label consistency**, demonstrating the effectiveness of multimodal supervision with minimal manual labeling.

Strong emphasis on clean, modular research code, reproducible experiments, and systematic evaluation aligned with real-world autonomous driving constraints.
