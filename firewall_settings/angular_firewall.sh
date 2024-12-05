#!/bin/bash

iptables -F

iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

iptables -A INPUT -p tcp --dport 4200 -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

iptables -A INPUT -p icmp --icmp-type echo-request -j DROP

iptables -A INPUT -j LOG --log-prefix "Angular Firewall: "