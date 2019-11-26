function getSuspActvJSON()
{
var spsactJSON = 
{
   "images" : [
      {
         "behaviors" : [
            {
               "category" : "Data Loss",
               "count" : 1,
               "description" : "Observes a program loads a library associated with the Windows cryptographic API",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observes a program loads a library associated with the Windows cryptographic API"
                  }
               ]
            },
            {
               "category" : "Data Loss",
               "count" : 1,
               "description" : "Observes a program that loads a library associated with cryptography (crypt32.dll)",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observes a program that loads a library associated with cryptography (crypt32.dll)"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "Observe a program that creates a new process",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observe a program that creates a new process"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program attempts to access a native API call",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program attempts to access a native API call"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program dynamically calls imported functions",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program dynamically calls imported functions"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program enumerated running processes in the system",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program enumerated running processes in the system"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program enumerates processes and/or modifies threads' contexts",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program enumerates processes and/or modifies threads' contexts"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program loads NTDLL",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program loads NTDLL"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program queries a process cookie",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program queries a process cookie"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program queries information on its own process",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program queries information on its own process"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program queries its own PEB",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program queries its own PEB"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program uses a native API call to load a DLL",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program uses a native API call to load a DLL"
                  }
               ]
            },
            {
               "category" : "Evasion / Persistance",
               "count" : 1,
               "description" : "The program executes other programs or commands",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program executes other programs or commands"
                  }
               ]
            },
            {
               "category" : "File system event",
               "count" : 2,
               "description" : "Suspicious file was accessed during emulation",
               "values" : [
                  {
                     "type" : "Suspicious File system activity",
                     "value" : "C:\\Users\\admin\\AppData\\Local\\Microsoft\\Windows\\Temporary Internet Files\\Content.IE5\\S1NFCAKQ\\ipv4bot_whatismyipaddress_com[1].htm (Write)"
                  },
                  {
                     "type" : "Suspicious File system activity",
                     "value" : "C:\\Users\\admin\\AppData\\Roaming\\Microsoft\\Crypto\\RSA\\S-1-5-21-292738990-2461527479-3432112557-1000\\0f5007522459c86e95ffcc62f32308f1_59699418-b221-48b6-be94-d011898af083 (Write)"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Allocates read-write-execute memory (usually to unpack itself)",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Allocates read-write-execute memory (usually to unpack itself)"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Checks amount of memory in system, this can be used to detect virtual machines that have a low amount of memory available",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Checks amount of memory in system, this can be used to detect virtual machines that have a low amount of memory available"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Checks the CPU name from registry, possibly for anti-virtualization",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Checks the CPU name from registry, possibly for anti-virtualization"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Generic detection methods (common)",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Generic detection methods (common)"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Observe a program that launches the Windows command prompt",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observe a program that launches the Windows command prompt"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Queries for the computername",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Queries for the computername"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Queries the disk size which could be used to detect virtual machine with small fixed size or dynamic allocation",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Queries the disk size which could be used to detect virtual machine with small fixed size or dynamic allocation"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Ransomware.Win.GandCrab is a malicious program that targets Windows operation system. Ransomware.Win.GandCrab modifies data on the victim computer so that the victim can no longer use the data.",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Ransomware.Win.GandCrab is a malicious program that targets Windows operation system. Ransomware.Win.GandCrab modifies data on the victim computer so that the victim can no longer use the data."
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Searches running processes potentially to identify processes for sandbox evasion, code injection or memory dumping",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Searches running processes potentially to identify processes for sandbox evasion, code injection or memory dumping"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "The program directly communicates with system drivers",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program directly communicates with system drivers"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Tried to identifie the machine name.",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Tried to identifie the machine name."
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Tried to reads information about supported languages",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Tried to reads information about supported languages"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Uses Windows APIs to generate a cryptographic key",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Uses Windows APIs to generate a cryptographic key"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Uses Windows utilities for basic Windows functionality",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Uses Windows utilities for basic Windows functionality"
                  }
               ]
            },
            {
               "category" : "Network event",
               "count" : 5,
               "description" : "Suspicious attempted network communication occurred during emulation",
               "values" : [
                  {
                     "type" : "Suspicious Network activity",
                     "value" : "DNS: 1.0.16.172.in-addr.arpa"
                  },
                  {
                     "type" : "Suspicious Network activity",
                     "value" : "DNS: a.dnspod.com"
                  },
                  {
                     "type" : "Suspicious Network activity",
                     "value" : "DNS: gandcrab.bit"
                  },
                  {
                     "type" : "Suspicious Network activity",
                     "value" : "DNS: ipv4bot.whatismyipaddress.com"
                  },
                  {
                     "type" : "Suspicious Network activity",
                     "value" : "http://ipv4bot.whatismyipaddress.com/"
                  }
               ]
            },
            {
               "category" : "Process event",
               "count" : 2,
               "description" : "Suspicious process was launched during emulation",
               "values" : [
                  {
                     "type" : "Suspicious Process activity",
                     "value" : "C:\\Users\\admin\\Desktop\\httpgvvwwwudropboxtdocsucomvGranCrabtv5.exe (Start)"
                  },
                  {
                     "type" : "Suspicious Process activity",
                     "value" : "C:\\Windows\\System32\\nslookup.exe (Start ,Terminate)"
                  }
               ]
            },
            {
               "category" : "Registry event",
               "count" : 1,
               "description" : "Observe a program that accesses the system services registry subkey",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observe a program that accesses the system services registry subkey"
                  }
               ]
            },
            {
               "category" : "Registry event",
               "count" : 1,
               "description" : "Observe a program that opens the ControlSet001 subkey",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observe a program that opens the ControlSet001 subkey"
                  }
               ]
            },
            {
               "category" : "Registry event",
               "count" : 1,
               "description" : "The program accesses a system related registry key",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program accesses a system related registry key"
                  }
               ]
            },
            {
               "category" : "Reputation",
               "count" : 4,
               "description" : "Well known malware",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Behaves like a known malware ( Generic.MALWARE.0b91 )"
                  },
                  {
                     "type" : "Suspicious activity",
                     "value" : "Malware activity observed ( HEUR:Trojan.Win32.Generic )"
                  },
                  {
                     "type" : "Suspicious activity",
                     "value" : "Malware detected ( Generic.Ransom.GandCrab.46AC681E )"
                  },
                  {
                     "type" : "Suspicious activity",
                     "value" : "Malware signature matched ( unknown.TC.mynro )"
                  }
               ]
            },
            {
               "category" : "URL Reputation",
               "count" : 1,
               "description" : "The file tried to access a C&C site.",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Attempted access to a known C&C site (DNS: gandcrab.bit)"
                  }
               ]
            }
         ],
         "image" : "Win7,Office 2013,Adobe 11"
      },
      {
         "behaviors" : [
            {
               "category" : "Data Loss",
               "count" : 1,
               "description" : "Observes a program loads a library associated with the Windows cryptographic API",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observes a program loads a library associated with the Windows cryptographic API"
                  }
               ]
            },
            {
               "category" : "Data Loss",
               "count" : 1,
               "description" : "Observes a program that loads a library associated with cryptography (crypt32.dll)",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observes a program that loads a library associated with cryptography (crypt32.dll)"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "Observe a program that creates a new process",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observe a program that creates a new process"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program attempts to access a native API call",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program attempts to access a native API call"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program dynamically calls imported functions",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program dynamically calls imported functions"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program enumerated running processes in the system",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program enumerated running processes in the system"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program enumerates processes and/or modifies threads' contexts",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program enumerates processes and/or modifies threads' contexts"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program loads NTDLL",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program loads NTDLL"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program queries information on its own process",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program queries information on its own process"
                  }
               ]
            },
            {
               "category" : "Evasion",
               "count" : 1,
               "description" : "The program uses a native API call to load a DLL",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program uses a native API call to load a DLL"
                  }
               ]
            },
            {
               "category" : "File system event",
               "count" : 3,
               "description" : "Suspicious file was accessed during emulation",
               "values" : [
                  {
                     "type" : "Suspicious File system activity",
                     "value" : "C:\\Documents and Settings\\admin\\Application Data\\Microsoft\\Crypto\\RSA\\S-1-5-21-1708537768-1972579041-725345543-1003\\0f5007522459c86e95ffcc62f32308f1_09d58e08-5be5-4de6-afdf-12947301d8db (Write)"
                  },
                  {
                     "type" : "Suspicious File system activity",
                     "value" : "C:\\Documents and Settings\\admin\\Local Settings\\Temporary Internet Files\\Content.IE5\\YJI7QVM1\\desktop.ini (Write)"
                  },
                  {
                     "type" : "Suspicious File system activity",
                     "value" : "C:\\Documents and Settings\\admin\\Local Settings\\Temporary Internet Files\\Content.IE5\\YJI7QVM1\\ipv4bot.whatismyipaddress[1].htm (Write)"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Allocates read-write-execute memory (usually to unpack itself)",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Allocates read-write-execute memory (usually to unpack itself)"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Checks amount of memory in system, this can be used to detect virtual machines that have a low amount of memory available",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Checks amount of memory in system, this can be used to detect virtual machines that have a low amount of memory available"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Checks the CPU name from registry, possibly for anti-virtualization",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Checks the CPU name from registry, possibly for anti-virtualization"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Queries for the computername",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Queries for the computername"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Queries the disk size which could be used to detect virtual machine with small fixed size or dynamic allocation",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Queries the disk size which could be used to detect virtual machine with small fixed size or dynamic allocation"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Ransomware.Win.GandCrab is a malicious program that targets Windows operation system. Ransomware.Win.GandCrab modifies data on the victim computer so that the victim can no longer use the data.",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Ransomware.Win.GandCrab is a malicious program that targets Windows operation system. Ransomware.Win.GandCrab modifies data on the victim computer so that the victim can no longer use the data."
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Searches running processes potentially to identify processes for sandbox evasion, code injection or memory dumping",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Searches running processes potentially to identify processes for sandbox evasion, code injection or memory dumping"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "The program directly communicates with system drivers",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program directly communicates with system drivers"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "The program uses LPC",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program uses LPC"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Uses Windows APIs to generate a cryptographic key",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Uses Windows APIs to generate a cryptographic key"
                  }
               ]
            },
            {
               "category" : "Generic",
               "count" : 1,
               "description" : "Uses Windows utilities for basic Windows functionality",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Uses Windows utilities for basic Windows functionality"
                  }
               ]
            },
            {
               "category" : "Network event",
               "count" : 5,
               "description" : "Suspicious attempted network communication occurred during emulation",
               "values" : [
                  {
                     "type" : "Suspicious Network activity",
                     "value" : "DNS: 1.0.16.172.in-addr.arpa"
                  },
                  {
                     "type" : "Suspicious Network activity",
                     "value" : "DNS: a.dnspod.com"
                  },
                  {
                     "type" : "Suspicious Network activity",
                     "value" : "DNS: gandcrab.bit"
                  },
                  {
                     "type" : "Suspicious Network activity",
                     "value" : "DNS: ipv4bot.whatismyipaddress.com"
                  },
                  {
                     "type" : "Suspicious Network activity",
                     "value" : "http://ipv4bot.whatismyipaddress.com/"
                  }
               ]
            },
            {
               "category" : "Process event",
               "count" : 2,
               "description" : "Suspicious process was launched during emulation",
               "values" : [
                  {
                     "type" : "Suspicious Process activity",
                     "value" : "C:\\WINDOWS\\system32\\nslookup.exe (Start ,Terminate)"
                  },
                  {
                     "type" : "Suspicious Process activity",
                     "value" : "C:\\hyperwise\\PP\\App\\snake.exe (Start)"
                  }
               ]
            },
            {
               "category" : "Registry event",
               "count" : 1,
               "description" : "Observe a program accesses the Winlogon registry subkey",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observe a program accesses the Winlogon registry subkey"
                  }
               ]
            },
            {
               "category" : "Registry event",
               "count" : 1,
               "description" : "Observe a program that accesses a registry key related to network settings",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observe a program that accesses a registry key related to network settings"
                  }
               ]
            },
            {
               "category" : "Registry event",
               "count" : 1,
               "description" : "Observe a program that accesses the Internet Settings registry key",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observe a program that accesses the Internet Settings registry key"
                  }
               ]
            },
            {
               "category" : "Registry event",
               "count" : 1,
               "description" : "Observe a program that accesses the system services registry subkey",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observe a program that accesses the system services registry subkey"
                  }
               ]
            },
            {
               "category" : "Registry event",
               "count" : 1,
               "description" : "Observe a program that opens the ControlSet001 subkey",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Observe a program that opens the ControlSet001 subkey"
                  }
               ]
            },
            {
               "category" : "Registry event",
               "count" : 1,
               "description" : "The program accesses a system related registry key",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "The program accesses a system related registry key"
                  }
               ]
            },
            {
               "category" : "Reputation",
               "count" : 4,
               "description" : "Well known malware",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Behaves like a known malware ( Generic.MALWARE.0b91 )"
                  },
                  {
                     "type" : "Suspicious activity",
                     "value" : "Malware activity observed ( HEUR:Trojan.Win32.Generic )"
                  },
                  {
                     "type" : "Suspicious activity",
                     "value" : "Malware detected ( Generic.Ransom.GandCrab.46AC681E )"
                  },
                  {
                     "type" : "Suspicious activity",
                     "value" : "Malware signature matched ( unknown.TC.nfmnu )"
                  }
               ]
            },
            {
               "category" : "URL Reputation",
               "count" : 1,
               "description" : "The file tried to access a C&C site.",
               "values" : [
                  {
                     "type" : "Suspicious activity",
                     "value" : "Attempted access to a known C&C site (DNS: gandcrab.bit)"
                  }
               ]
            }
         ],
         "image" : "WinXP,Office 2003/7,Adobe 9"
      }
   ]
}
;
 return spsactJSON;
}