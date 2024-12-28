package com.PAP_team_21.flashcards.entities;
import com.fasterxml.jackson.annotation.JsonView;



public class JsonViewConfig {
    public static class Public {}
    public static class Internal extends Public {}

    public static class BasicStructures extends Internal {}

    public static class ExtendedStructures extends Internal {}

}
