package de.wvv.web.rest;

import de.wvv.WirvsvirusApp;
import de.wvv.domain.WorkingStyle;
import de.wvv.repository.WorkingStyleRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link WorkingStyleResource} REST controller.
 */
@SpringBootTest(classes = WirvsvirusApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class WorkingStyleResourceIT {

    private static final String DEFAULT_WORKING_STYLE = "AAAAAAAAAA";
    private static final String UPDATED_WORKING_STYLE = "BBBBBBBBBB";

    @Autowired
    private WorkingStyleRepository workingStyleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWorkingStyleMockMvc;

    private WorkingStyle workingStyle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkingStyle createEntity(EntityManager em) {
        WorkingStyle workingStyle = new WorkingStyle()
            .workingStyle(DEFAULT_WORKING_STYLE);
        return workingStyle;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkingStyle createUpdatedEntity(EntityManager em) {
        WorkingStyle workingStyle = new WorkingStyle()
            .workingStyle(UPDATED_WORKING_STYLE);
        return workingStyle;
    }

    @BeforeEach
    public void initTest() {
        workingStyle = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkingStyle() throws Exception {
        int databaseSizeBeforeCreate = workingStyleRepository.findAll().size();

        // Create the WorkingStyle
        restWorkingStyleMockMvc.perform(post("/api/working-styles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(workingStyle)))
            .andExpect(status().isCreated());

        // Validate the WorkingStyle in the database
        List<WorkingStyle> workingStyleList = workingStyleRepository.findAll();
        assertThat(workingStyleList).hasSize(databaseSizeBeforeCreate + 1);
        WorkingStyle testWorkingStyle = workingStyleList.get(workingStyleList.size() - 1);
        assertThat(testWorkingStyle.getWorkingStyle()).isEqualTo(DEFAULT_WORKING_STYLE);
    }

    @Test
    @Transactional
    public void createWorkingStyleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workingStyleRepository.findAll().size();

        // Create the WorkingStyle with an existing ID
        workingStyle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkingStyleMockMvc.perform(post("/api/working-styles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(workingStyle)))
            .andExpect(status().isBadRequest());

        // Validate the WorkingStyle in the database
        List<WorkingStyle> workingStyleList = workingStyleRepository.findAll();
        assertThat(workingStyleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllWorkingStyles() throws Exception {
        // Initialize the database
        workingStyleRepository.saveAndFlush(workingStyle);

        // Get all the workingStyleList
        restWorkingStyleMockMvc.perform(get("/api/working-styles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workingStyle.getId().intValue())))
            .andExpect(jsonPath("$.[*].workingStyle").value(hasItem(DEFAULT_WORKING_STYLE)));
    }
    
    @Test
    @Transactional
    public void getWorkingStyle() throws Exception {
        // Initialize the database
        workingStyleRepository.saveAndFlush(workingStyle);

        // Get the workingStyle
        restWorkingStyleMockMvc.perform(get("/api/working-styles/{id}", workingStyle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(workingStyle.getId().intValue()))
            .andExpect(jsonPath("$.workingStyle").value(DEFAULT_WORKING_STYLE));
    }

    @Test
    @Transactional
    public void getNonExistingWorkingStyle() throws Exception {
        // Get the workingStyle
        restWorkingStyleMockMvc.perform(get("/api/working-styles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkingStyle() throws Exception {
        // Initialize the database
        workingStyleRepository.saveAndFlush(workingStyle);

        int databaseSizeBeforeUpdate = workingStyleRepository.findAll().size();

        // Update the workingStyle
        WorkingStyle updatedWorkingStyle = workingStyleRepository.findById(workingStyle.getId()).get();
        // Disconnect from session so that the updates on updatedWorkingStyle are not directly saved in db
        em.detach(updatedWorkingStyle);
        updatedWorkingStyle
            .workingStyle(UPDATED_WORKING_STYLE);

        restWorkingStyleMockMvc.perform(put("/api/working-styles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedWorkingStyle)))
            .andExpect(status().isOk());

        // Validate the WorkingStyle in the database
        List<WorkingStyle> workingStyleList = workingStyleRepository.findAll();
        assertThat(workingStyleList).hasSize(databaseSizeBeforeUpdate);
        WorkingStyle testWorkingStyle = workingStyleList.get(workingStyleList.size() - 1);
        assertThat(testWorkingStyle.getWorkingStyle()).isEqualTo(UPDATED_WORKING_STYLE);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkingStyle() throws Exception {
        int databaseSizeBeforeUpdate = workingStyleRepository.findAll().size();

        // Create the WorkingStyle

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkingStyleMockMvc.perform(put("/api/working-styles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(workingStyle)))
            .andExpect(status().isBadRequest());

        // Validate the WorkingStyle in the database
        List<WorkingStyle> workingStyleList = workingStyleRepository.findAll();
        assertThat(workingStyleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWorkingStyle() throws Exception {
        // Initialize the database
        workingStyleRepository.saveAndFlush(workingStyle);

        int databaseSizeBeforeDelete = workingStyleRepository.findAll().size();

        // Delete the workingStyle
        restWorkingStyleMockMvc.perform(delete("/api/working-styles/{id}", workingStyle.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WorkingStyle> workingStyleList = workingStyleRepository.findAll();
        assertThat(workingStyleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
