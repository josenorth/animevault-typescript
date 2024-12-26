Environment Setup Guide: WSL2, Docker, and AnimeVault
Introduction
This documentation provides a detailed guide for setting up a development environment on Windows using WSL2 with Debian, Docker, and the application AnimeVault, a web for anime metadata. This setup enables users to run AnimeVault in a Linux environment from Windows without needing a full virtual machine. Additionally, an optional guide is included to facilitate remote development in Visual Studio Code via SSH.

Prerequisites
Operating System: Windows 10 or Windows 11.
Administrator permissions on the system to execute installation commands.
1. Installing and Configuring WSL2
WSL2 (Windows Subsystem for Linux) enables Linux environments to run on Windows. The following steps outline how to enable WSL and configure Debian as the chosen distribution.

Step 1.1: Enabling WSL and Setting Up Debian on Windows
Open PowerShell as an administrator.

Execute the following command to enable WSL and specify version 2:

wsl --install
If WSL is already installed but needs to be updated to version 2, use:

wsl --set-default-version 2
Install Debian by executing the following in PowerShell:

wsl --install -d Debian
Restart the system if prompted and open Debian from the Start menu or by running wsl in PowerShell.

Set up the Debian username and password when it starts for the first time.

2. Installing Docker on WSL2 with Debian
Once WSL2 is set up, Docker should be installed in Debian. This guide uses Docker's official repository to ensure the latest version is installed.

Step 2.1: Setting Up the Docker Repository
Update packages and install the necessary certificates:

sudo apt-get update
sudo apt-get install -y ca-certificates curl
Create the directory to store Docker's GPG key:

sudo install -m 0755 -d /etc/apt/keyrings
Add Docker's official GPG key:

sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
Add Docker’s repository to APT sources:

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
Update the package list:

sudo apt-get update
Note: On Debian-derived distributions such as Kali Linux, replace $(. /etc/os-release && echo "$VERSION_CODENAME") with the corresponding Debian codename, such as bookworm.

Step 2.2: Installing Docker
Install Docker and the required additional packages:

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
Verify the installation by running:

docker --version
Step 2.3: Configuring Docker to Run without sudo
By default, Docker requires superuser privileges (sudo) to execute commands. To avoid needing sudo each time, add the current user to the Docker group.

Add the current user to the Docker group:

sudo usermod -aG docker $USER
After adding the user to the group, it is necessary to log out of Debian in WSL2 and log back in for the changes to take effect. This can be done by closing the terminal window and reopening it.

Verify that Docker works without sudo by running a test command:

docker run hello-world
This command should successfully run a Docker test container. If it executes without errors, the configuration was successful.

3. Setting Up the AnimeVault Application in the Docker Environment
With Docker configured, it is now possible to download, set up, and run AnimeVault in the container.

Step 3.1: Create the Application Directory
Create the /var/www/ directory to store AnimeVault:

sudo mkdir -p /var/www/
Change to the newly created directory:

cd /var/www/
Step 3.2: Clone the Repository
Clone the AnimeVault repository into the directory:

git clone https://github.com/josenorth/animevault-typescript.git
Change to the cloned repository directory:

cd animevault-typescript
Step 3.3: Launch the Application with Docker Compose
Use docker compose to launch the containers in the background:

docker compose up -d
Once the containers are up and running, open a browser and navigate to http://localhost:5173 to access the AnimeVault application running with React, Vite, and TypeScript.

4. Optional: Setting Up Remote Connection in Visual Studio Code
To make editing AnimeVault files in Debian from Visual Studio Code on Windows easier, remote connection via SSH can be configured. This allows opening and editing files directly in the Linux environment, providing a more integrated development experience.

Step 4.1: Install and Configure OpenSSH Server in WSL2
First, install and configure OpenSSH Server in Debian on WSL2 to enable remote connection.

In the Debian terminal, install OpenSSH Server:

sudo apt-get install openssh-server
Start the SSH service to accept remote connections:

sudo service ssh start
Verify that the SSH server is active by running:

sudo service ssh status
Obtain the WSL2 IP address needed to connect from Visual Studio Code. Instead of hostname -I, it is recommended to use the command ip a to see details of the eth0 network interface:

ip a
In the output, locate the eth0 section (network interface section). The IPv4 address for WSL2 in this case will appear after inet on the scope global eth0 line.

2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1492 qdisc mq state UP group default qlen 1000
    link/ether 00:15:5d:b4:9b:da brd ff:ff:ff:ff:ff:ff
    inet 172.17.144.126/20 brd 172.17.159.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::215:5dff:feb4:9bda/64 scope link
       valid_lft forever preferred_lft forever


Note: This IP address may change each time WSL restarts, so this step may need to be repeated in future connections.

Step 4.2: Configure the SSH Connection in Visual Studio Code
To connect Visual Studio Code to the Debian environment in WSL2, the Remote - SSH extension must be installed and an SSH connection configured.

Open Visual Studio Code on Windows.

Go to the Extensions tab and search for the Remote - SSH extension (published by Microsoft). Install the extension.

Once the extension is installed, open the Command Palette in Visual Studio Code (using Ctrl+Shift+P).

Select Remote-SSH: Connect to Host.... A dialog will open to enter the SSH server address.

Enter the IP address obtained in the previous step, in the format:

ssh <username>@172.17.144.126
Replace <username> with the Debian username. For example:

ssh user@172.17.144.126
If it’s the first time connecting, a message will appear asking to confirm the host's authenticity. Type yes and press Enter.

Enter the password configured for the Debian user when prompted. This should connect Visual Studio Code to the Debian environment in WSL2, displaying a terminal in the lower-left corner indicating that the remote connection is active.

Step 4.3: Open and Edit the AnimeVault Folder in Visual Studio Code
To facilitate file editing, open the AnimeVault application directory (/var/www/animevault-typescript) in Visual Studio Code.

In Visual Studio Code, once connected to the remote environment, select File > Open Folder.
In the folder selection dialog, navigate to /var/www/animevault-typescript.
Select the animevault-typescript folder and click Open.
This will load all AnimeVault files in Visual Studio Code’s file explorer, allowing for direct editing and saving of changes within the WSL2 environment.

If needing to run commands related to AnimeVault (like docker compose up -d), open an integrated terminal in Visual Studio Code by selecting Terminal > New Terminal.
This terminal will automatically connect to the Debian environment in WSL2, allowing commands to be executed directly without switching windows.

Additional Considerations
Updating the IP Address: Since the WSL2 IP address can change when restarting the environment, it’s necessary to check the IP before each session or when encountering connection issues.
Automatic SSH Startup: To avoid manually starting the SSH service each session, a script can be configured to run sudo service ssh start at the start of each WSL session.