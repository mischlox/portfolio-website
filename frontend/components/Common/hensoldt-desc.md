## Focus Areas

The role centered on benchmarking and efficiently deploying deep neural network based object detectors on limited hardware, such as edge devices. This involved designing a generic evaluation framework, optimizing state-of-the-art models, and performing cross-platform comparison of vendor-specific hardware and software optimization pipelines.

### Bachelor Thesis & Publication

* **Thesis Title:** *“Evaluation and Optimization of Deep-Learning based Object Detection on Embedded Inference Hardware from Xilinx and Nvidia”*. **Grade: 1.3**
* **Publication:** *A Framework for Benchmarking Real-Time Embedded Object Detection, DAGM GCPR 2022*.

## Key Contributions and Achievements

* **Generic Benchmarking Framework:** Designed and implemented a novel, lightweight framework to connect a host evaluation PC with multiple embedded target devices.
* **Comprehensive Evaluation:** Separated data distribution and evaluation to simultaneously measure accuracy, runtime, and power consumption without influencing the target device's processing.
* **Optimization and Cross-Platform Deployment:** Utilized and compared vendor-specific optimization pipelines (Nvidia TensorRT for Jetson AGX Xavier and Xilinx Vitis AI for ZCU104) and applied techniques like quantizatioon and pruning to analyze accuracy vs. speed trade-offs of deployed models.
* **Embedded Systems Implementation:** Implemented the target C++ software and configured Embedded Linux environments for the direct deployment and verification of Deep Learning models on operational FPGA/GPU platforms.
