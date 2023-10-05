#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define echo D7
#define trig D6

const char* ssid = "your_ssid";
const char* password = "your_password";
WiFiClient client;

void setup() {
  Serial.begin(9600);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  WiFi.disconnect();
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop(){
  digitalWrite(trig, HIGH);
  delay(10);
  digitalWrite(trig, LOW);

  float duration = pulseIn(echo, HIGH);
  float distance = ((float)(340 * duration) / 10000)/2; 

  Serial.print("Duration: ");
  Serial.println(duration);
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println("cm/n");

 if (distance <= 70) {
    sendHttpPostRequest(true);
    Serial.println("Sent 'true' to server");
  } else {
    sendHttpPostRequest(false);
    Serial.println("Sent 'false' to server");
  }
  
  delay(2000);
}

void sendHttpPostRequest(bool value) {
  HTTPClient http;
  
  if (http.begin(client, "http://your_endpoint")) {
    http.addHeader("Content-Type", "text/plain");
    String postPayload = String(value ? "true" : "false");


    Serial.println("post = " + postPayload);
//    Serial.println( WiFi.localIP());
    int httpCode = http.POST(postPayload);
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println("HTTP response code: " + String(httpCode));
      Serial.println("Server response: " + payload);
    } else {
      Serial.println("HTTP response code: " + String(httpCode));
      Serial.println("HTTP request failed");
    }
    
    http.end();
  } else {
    Serial.println("Unable to connect to server");
  }
}
