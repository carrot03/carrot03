import streamlit as st
from openai import OpenAI
import serial, time
import pygame
from dotenv import load_dotenv
import os
from pathlib import Path

# ========== LOAD ENV ==========
load_dotenv()
API_KEY = os.getenv("api_key")

# ========== OPENAI CLIENT ==========
client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key=API_KEY)

# ========== ARDUINO LCD SETUP ==========
try:
    arduino = serial.Serial('COM3', 9600)  # adjust COM port if needed
    time.sleep(2)
    connected = True
except Exception as e:
    connected = False
    print(f"Arduino not connected: {e}")

print(f"Arduino connected: {connected}")

def send_to_lcd(message: str):
    """Send up to two lines to LCD via serial."""
    if connected:
        if not message.endswith("\n"):
            message += "\n"
        arduino.write(message.encode())
        print(f"Sent to LCD: {message}")

if connected:
    send_to_lcd("SpiritLink Ready\nHappy Halloween!")

# ========== PYGAME SOUND SETUP ==========
pygame.mixer.init()

def play_sound(file):
    try:
        pygame.mixer.Sound(file).play()
    except Exception as e:
        print(f"Sound error: {e}")

# ========== STREAMLIT UI SETUP ==========
st.set_page_config(page_title="SpiritLink 👁️", page_icon="👻", layout="centered")

st.markdown(
    """
    <h1 style='text-align:center; color:#FF7518;'>
    👁️ SpiritLink 👁️<br>Summon the AI Spirit Judge
    </h1>
    <p style='text-align:center; color:gray;'>Answer truthfully… the Spirit sees all 👻</p>
    """,
    unsafe_allow_html=True,
)

# ========== QUESTIONS ==========
questions = [
    "If a ghost offered you candy, would you take it?",
    "How would you scare your best friend on Halloween?",
    "Choose your Halloween power: invisibility, possession, or trickery?",
]

answers = []
for i, q in enumerate(questions):
    answers.append(st.text_input(f"💀 Q{i+1}: {q}", ""))

# ========== SUMMON THE SPIRIT ==========
if st.button("Summon the Spirit 🕯️"):
    user_text = "\n".join(answers)
    with st.spinner("👁️ The Spirit is judging your soul..."):
        prompt = f"""
        You are an ancient Halloween spirit judging a human's spooky essence.

        Here are their answers:
        {user_text}

        Decide their level:
        - HARMLESS (too nice)
        - TRICKSTER (fun but creepy)
        - DARK_LORD (truly spooky)

        Then give a one-line spooky message, and optionally assign a playful mission.
        """

        # AI verdict
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are the Halloween Spirit Judge with a dark sense of humor."},
                    {"role": "user", "content": prompt},
                ],
            )
            result = response.choices[0].message.content.strip()
        except Exception as e:
            result = "HARMLESS: The Spirit is silent…"
            st.error(f"AI request failed: {e}")

        st.markdown(f"### 👻 Spirit’s Verdict:\n> {result}")

        # ========== AI DECISION + SOUND + LCD ==========
        if "HARMLESS" in result.upper():
            play_sound("sounds/laugh.wav")
            send_to_lcd("HARMLESS\nHave fun!")
        elif "TRICKSTER" in result.upper():
            play_sound("sounds/thunder.wav")
            send_to_lcd("TRICKSTER\nBeware!")
        elif "DARK_LORD" in result.upper():
            play_sound("sounds/evil_laugh.wav")
            send_to_lcd("DARK LORD\nRun!")
        else:
            send_to_lcd("???\nSpirit unsure")

        # ========== FOLLOW-UP ==========
        st.markdown("### 🔮 The Spirit whispers...")
        try:
            follow_up = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are the Halloween Spirit following up mysteriously."},
                    {"role": "user", "content": f"The spirit judged the user as {result}. Give one creepy line of advice."},
                ],
            )
            st.markdown(f"_{follow_up.choices[0].message.content}_")
        except Exception:
            st.markdown("_The Spirit remains silent…_")
